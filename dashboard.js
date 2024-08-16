import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth , db } from "./config.js"
import { 
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


const form = document.querySelector("#form");
const place = document.querySelector("#placeholder");
const desc = document.querySelector("#description");
const products = document.querySelector("#products");
const logout = document.querySelector("#logout-btn");



let arr = [];



// Logout 
logout.addEventListener('click' , ()=>{
  signOut(auth).then(() => {
      console.log("Logout Successfuly");
      window.location = "login.html"
  }).catch((error) => {
      console.log(error);
  });
})



// Add Event listener blog form:
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "Blogs"), {
      Place: place.value,
      desc: desc.value,
    });
    console.log("Document written with ID: ", docRef.id)
    arr.push({
      Place: place.value,
      desc: desc.value,
      id: docRef.id,
    });

render();
place.value = "";
desc.value = "";
  } catch (error) {
    console.error("Error : ", error);
  }
});


  // read data

  async function data() {
    arr = [];
    const q = query(collection(db , "Blogs"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data() , id: doc.id });
    });
    console.log(arr);
    render();
  }
  
  data();


// Render 
function render() {
  products.innerHTML = "";
  if (arr.length === 0) {
    products.innerHTML = "No data found";
    return;
  }
  arr.map((items) => {
    products.innerHTML +=`
    <div class="mt-3 bg-base-300 rounded-box px-4 py-3 w-[550px]">
    <article>
    <h2 class="text-3xl font-bold mb-4">${items.Place}</h2>
    <div class="mb-8">
    <p>${items.desc}</p>
    </div>
    <div class="flex space-x-3">
    <button id="editBtn" class="btn btn-primary">Edit</button>
    <button id="deleteBtn" class="btn btn-primary">Delete</button>
    </div>
    </article>
    </div>`;
  

const editBtn = document.querySelectorAll("#editBtn");
const deleteBtn = document.querySelectorAll("#deleteBtn");

editBtn.forEach((btn , index)=>{
  btn.addEventListener("click", async()=>{
    const newValue = prompt("Enter new Value")
    const secValue = prompt("Enter new Value")
    const updatedValue = doc(db, "Blogs", arr[index].id);
    await updateDoc(updatedValue, {
      place : newValue,
      desc : secValue
    });
    console.log("Updated");
    arr[index].place = newValue;
    arr[index].desc = secValue;
    render()
  })
})

deleteBtn.forEach((btn , index) => {

btn.addEventListener("click" , async () => {
  await deleteDoc(doc(db, "Blogs", arr[index].id));
  console.log("Data Deleted Successfully");

  arr.splice(index , 1);
  render();
});
});
});
}

render()
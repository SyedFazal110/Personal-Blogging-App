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


// Function to render todo data on the browser:
function render() {
  products.innerHTML = "";
  if (arr.length === 0) {
    products.innerHTML = "No data found";
    return;
  }
  arr.map((items) => {
    products.innerHTML +=`
  <div class="flex flex-col lg:flex-row gap-8">
  <article class="flex-1">
      <h2 class="text-4xl font-bold mb-4">${items.Place}</h2>
      <div class="prose max-w-none mb-8">
          <p>${items.desc}</p>
      </div>
      <div class="flex space-x-4">
          <button id="editBtn">Edit</button>
          <button id="deleteBtn">Delete</button>
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
import { db } from "./config.js"

import { 
    collection,
    getDocs,
    doc,
    query
  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


  const products = document.querySelector("#products");

  let arr = [];

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
      <div class="flex">
      </div>
      </article>
      </div>`;
  });
  }
  
  render()
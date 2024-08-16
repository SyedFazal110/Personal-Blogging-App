import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {auth} from "./config.js"


const email = document.querySelector("#email");
const form = document.querySelector("#form");
const password = document.querySelector("#password");



form.addEventListener('submit' , (event)=>{
  event.preventDefault()
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = "dashboard.html"
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})
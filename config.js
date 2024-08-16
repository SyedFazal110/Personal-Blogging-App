import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyD9frQG-mIgPKgd3e_POeEQqXExTlQs67o",
    authDomain: "personal-blogging-app-a4ce2.firebaseapp.com",
    projectId: "personal-blogging-app-a4ce2",
    storageBucket: "personal-blogging-app-a4ce2.appspot.com",
    messagingSenderId: "565886456366",
    appId: "1:565886456366:web:20b3b33794cecc4b7b45bf",
    measurementId: "G-CQTE8ZYM0W"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
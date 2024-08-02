// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//added by kyel

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl4_0252yJ5HI8rPvQ_IrtWARKIsNwMDU",
  authDomain: "supermoviefinderkyle.firebaseapp.com",
  projectId: "supermoviefinderkyle",
  storageBucket: "supermoviefinderkyle.appspot.com",
  messagingSenderId: "1046313861860",
  appId: "1:1046313861860:web:d80fc3b751a8785271e2f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//added by kyle
export const auth = getAuth(app);
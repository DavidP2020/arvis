// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0XmXZGlsKvI2RabGG_APD7G9pViX9jBs",
  authDomain: "arvis-shop.firebaseapp.com",
  projectId: "arvis-shop",
  storageBucket: "arvis-shop.appspot.com",
  messagingSenderId: "212731617740",
  appId: "1:212731617740:web:83cdfa16d82b8712253d69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

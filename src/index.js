import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import AppWrapper from "./App";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWPBHlImUtlJaNZf-rAi5oJ80wROwDYCQ",
  authDomain: "wornick-giveaway.firebaseapp.com",
  projectId: "wornick-giveaway",
  storageBucket: "wornick-giveaway.appspot.com",
  messagingSenderId: "1072947831038",
  appId: "1:1072947831038:web:aa927e8d95a38f92a605af",
  measurementId: "G-5DZVYHK4CW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current session only.
    // New sign-in will be persisted with session persistence.
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { auth };

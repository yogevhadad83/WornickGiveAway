import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const db = getFirestore(app);

export { auth, db };

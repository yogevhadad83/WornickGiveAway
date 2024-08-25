import React, { createContext, useContext } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const FirestoreContext = createContext(null);

const FirestoreProvider = ({ children }) => {
  const setDocument = async (collection, id, data) => {
    try {
      await setDoc(doc(db, collection, id), data);
    } catch (error) {
      console.error("Error setting document: ", error);
    }
  };

  const getDocument = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document: ", error);
      return null;
    }
  };

  return (
    <FirestoreContext.Provider value={{ setDocument, getDocument }}>
      {children}
    </FirestoreContext.Provider>
  );
};

const useFirestore = () => useContext(FirestoreContext);

export { FirestoreProvider, useFirestore };

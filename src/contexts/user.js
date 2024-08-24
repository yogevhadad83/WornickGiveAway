import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
// import { onAuthStateChanged } from "firebase/auth";
import { useFirestore } from "./firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const { getDocument } = useFirestore(); // Access auth from useFirebase
  const [user, setUser] = useState(null);

  const setUserWithFbId = useCallback(
    async (uid) => {
      try {
        const user = await getDocument("users", uid);
        setUser(user);
      } catch (e) {
        console.error("user", e);
        setUser(null);
      }
    },
    [getDocument]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      console.log("onAuthStateChanged", fbUser);
      if (fbUser) {
        setUserWithFbId(fbUser.uid);
      }
    });

    return () => unsubscribe();
  }, [setUserWithFbId]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

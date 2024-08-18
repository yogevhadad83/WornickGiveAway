//import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddItem from "./pages/addItem/addItem";
import Home from "./pages/home/home";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from ".";

import "./App.css";

function App() {
  //const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="wornick-giveaway">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

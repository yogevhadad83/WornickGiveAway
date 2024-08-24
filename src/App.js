//import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user";
import AddItem from "./pages/addItem/addItem";
import Home from "./pages/home/home";

import "./App.css";
import { FirestoreProvider } from "./contexts/firestore";

function App() {
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

function AppWrapper({ auth }) {
  return (
    <FirestoreProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </FirestoreProvider>
  );
}

export default AppWrapper;

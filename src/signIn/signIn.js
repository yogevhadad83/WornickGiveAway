import React, { useState } from "react";
import Dialog from "../components/dialog/diaog";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../index"; // Import auth from index.js

import "./signIn.css";

const SignInDialog = ({ onClose, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <Dialog title="Sign In" onClose={onClose}>
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
      <div className="register-link">
        <p>Don't have an account? </p>
        <span onClick={onRegister} className="register-button">
          Register
        </span>
      </div>
    </Dialog>
  );
};

export default SignInDialog;

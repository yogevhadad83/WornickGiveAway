import React, { useState } from "react";
import Dialog from "../../components/dialog/diaog";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./signIn.css";
import { auth } from "../../firebaseConfig";

const SignInDialog = ({ onClose, onOpenRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      console.error("Error signing in:", error);
      setError(
        "Failed to sign in. Please check your email and password and try again."
      );
    }
  };

  return (
    <Dialog title="Sign In" onClose={onClose} className="sign-in-dialog">
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
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
      <div className="register-link">
        <p>Don't have an account? </p>
        <span
          onClick={onOpenRegister}
          className="register-button"
          role="button"
          tabIndex="0"
        >
          Register
        </span>
      </div>
    </Dialog>
  );
};

export default SignInDialog;

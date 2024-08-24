import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Dialog from "../components/dialog/diaog";

import "./register.css";
import { useFirestore } from "../contexts/firestore";
import { auth } from "../firebaseConfig";

const RegisterDialog = ({ onClose, onOpenSignIn }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { setDocument } = useFirestore();

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!location) newErrors.location = "Location name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const fbUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await setDocument("users", fbUser.user.uid, {
          fullName,
          location,
          phoneNumber,
        });

        onClose();
      } catch (error) {
        console.error("Error creating user: ", error);
      }
    }
  };

  return (
    <Dialog title="Register" onClose={onClose} className="register-dialog">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      <div className="sign-in-link">
        <p>Already have an account?</p>
        <span
          onClick={onOpenSignIn}
          className="sign-in-button"
          role="button"
          tabIndex="0"
        >
          Sign In
        </span>
      </div>
    </Dialog>
  );
};

export default RegisterDialog;

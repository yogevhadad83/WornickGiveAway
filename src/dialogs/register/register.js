import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import UserDetailsForm, {
  validate,
} from "../../components/userDetailsForm/userDetailsForm";
import "./register.css";
import { useFirestore } from "../../contexts/firestore";
import { auth } from "../../firebaseConfig";
import Dialog from "../../components/dialog/diaog";

const RegisterDialog = ({ onClose, onOpenSignIn }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");

  const { setDocument } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(fullName, location, email, phoneNumber, setErrors);
    if (isValid) {
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
        setRegisterError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <Dialog title="Register" onClose={onClose} className="register-dialog">
      <form onSubmit={handleSubmit}>
        <UserDetailsForm
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          location={location}
          setLocation={setLocation}
          errors={errors}
          setErrors={setErrors}
        />
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
        {registerError && <span className="error">{registerError}</span>}
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

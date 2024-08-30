import React, { useState, useEffect } from "react";
import UserDetailsForm, {
  validate,
} from "../../components/userDetailsForm/userDetailsForm";
import "./account.css";
import { useFirestore } from "../../contexts/firestore";
import Page from "../../components/page/page";
import { useUser } from "../../contexts/user";

const AccountPage = () => {
  const { user } = useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [updateError, setUpdateError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const { setDocument } = useFirestore();

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setLocation(user.location || "");
    }
  }, [user]);

  const handleInputChange = (setter) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setter(value);
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(fullName, location, phoneNumber, setErrors);
    if (isValid) {
      try {
        await setDocument("users", user.uid, {
          fullName,
          location,
          phoneNumber,
          email,
        });
        // Optionally, you can add a success message or redirect the user
      } catch (error) {
        console.error("Error updating user details: ", error);
        setUpdateError("Failed to update details. Please try again.");
      }
    }
  };

  return (
    <Page closable>
      <div className="account-page">
        <h1>Your Account</h1>
        <h2>{user?.email}</h2>
        <form onSubmit={handleSubmit}>
          <UserDetailsForm
            fullName={fullName}
            setFullName={handleInputChange(setFullName)}
            setEmail={handleInputChange(setEmail)}
            phoneNumber={phoneNumber}
            setPhoneNumber={handleInputChange(setPhoneNumber)}
            location={location}
            setLocation={handleInputChange(setLocation)}
            errors={errors}
          />
          {updateError && <span className="error">{updateError}</span>}
          <button type="submit" className="submit-button" disabled={!isChanged}>
            Save
          </button>
        </form>
      </div>
    </Page>
  );
};

export default AccountPage;

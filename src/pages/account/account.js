import React, { useState } from "react";
import UserDetailsForm, {
  validate,
} from "../../components/userDetailsForm/userDetailsForm";
import "./account.css";
import { useFirestore } from "../../contexts/firestore";
import Page from "../../components/page/page";
import { useUser } from "../../contexts/user";

const AccountPage = () => {
  const { user } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [location, setLocation] = useState(user?.location || "");
  const [errors, setErrors] = useState({});
  const [updateError, setUpdateError] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const { setDocument } = useFirestore();

  const handleInputChange = (setter) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setter(value);
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(fullName, location, email, phoneNumber, setErrors);
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
    <Page headerTools={<div>Personal Details</div>}>
      <div className="account-page">
        <form onSubmit={handleSubmit}>
          <UserDetailsForm
            fullName={fullName}
            setFullName={handleInputChange(setFullName)}
            email={email}
            setEmail={handleInputChange(setEmail)}
            phoneNumber={phoneNumber}
            setPhoneNumber={handleInputChange(setPhoneNumber)}
            location={location}
            setLocation={handleInputChange(setLocation)}
            errors={errors}
            setErrors={setErrors}
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

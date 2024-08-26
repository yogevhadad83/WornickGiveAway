import React from "react";
import "./userDetailsForm.css";

export const validate = (fullName, location, phoneNumber, setErrors) => {
  const newErrors = {};
  if (!fullName) newErrors.fullName = "Full name is required";
  if (!location) newErrors.location = "Location is required";
  if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const UserDetailsForm = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  location,
  setLocation,
  errors,
}) => {
  return (
    <>
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
    </>
  );
};

export default UserDetailsForm;

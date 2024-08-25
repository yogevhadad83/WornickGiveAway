import React from "react";
import "./avatar.css"; // Make sure to create a CSS file for styling
import { useUser } from "../../../../contexts/user";

const Avatar = ({ toggleMenu }) => {
  const { user } = useUser();

  return (
    <div className="avatar-circle" onClick={toggleMenu}>
      {user?.fullName?.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;

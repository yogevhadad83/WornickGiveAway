import React, { useState } from "react";
import "./avatar.css"; // Make sure to create a CSS file for styling

const Avatar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  console.log(user);

  return (
    <div className="avatar-container">
      <div className="avatar-circle" onClick={toggleMenu}>
        {user?.fullName?.charAt(0).toUpperCase()}
      </div>
      {menuOpen && (
        <div className="avatar-menu">{/* Menu content will go here */}</div>
      )}
    </div>
  );
};

export default Avatar;

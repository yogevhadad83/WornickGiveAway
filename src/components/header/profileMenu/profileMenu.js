import React, { useState } from "react";
import Avatar from "./avatar/avatar";
import { useUser } from "../../../contexts/user";
import { getAuth, signOut } from "firebase/auth";
import "./profileMenu.css";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToPersonalDetails = () => {
    setIsOpen(false);
    navigate("/personal-details");
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="profile-menu">
      <Avatar toggleMenu={toggleMenu}></Avatar>
      {isOpen && (
        <div className="menu">
          <div className="menu-header">
            <h3>{user.fullName}</h3>
          </div>
          <ul>
            <li>
              <span onClick={navigateToPersonalDetails}>Personal Details</span>
            </li>
            <li>
              <span onClick={handleSignOut}>Sign Out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

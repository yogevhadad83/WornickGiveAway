import Button from "../button/button";
import Avatar from "../avatar/avatar";
import "./header.css";
import { useUser } from "../../contexts/user";
import { Children } from "react";

function Header({ children }) {
  const { user } = useUser();

  return (
    <div className="header">
      <h1>Wornick Giveaway</h1>
      <div className="header-buttons-container">{children}</div>
    </div>
  );
}

export default Header;

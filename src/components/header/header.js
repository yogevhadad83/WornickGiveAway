import { useUser } from "../../contexts/user";
import "./header.css";
import ProfileMenu from "./profileMenu/profileMenu";

function Header({ children }) {
  const { user } = useUser();

  return (
    <div className="header">
      <h1>Wornick Giveaway</h1>
      <div className="header-buttons-container">{children}</div>
      {user ? <ProfileMenu /> : ""}
    </div>
  );
}

export default Header;

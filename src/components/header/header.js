import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user";
import "./header.css";
import ProfileMenu from "./profileMenu/profileMenu";

function Header({ children, closable }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="header">
      {closable && (
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      )}
      <h1>Wornick Giveaway</h1>
      <div className="header-buttons-container">{children}</div>
      {user ? <ProfileMenu /> : ""}
    </div>
  );
}

export default Header;

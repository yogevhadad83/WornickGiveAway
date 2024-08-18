import Button from "../button/button";
import "./header.css";

function Header({ onSignIn, onListItem, user }) {
  return (
    <div className="header">
      <h1>Wornick Giveaway</h1>
      <div className="header-buttons-container">
        <Button variant="primary" onClick={onListItem}>
          List an Item
        </Button>
        {user ? (
          user.email
        ) : (
          <Button variant="secondary" onClick={onSignIn}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;

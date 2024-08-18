import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/gallery";
import Header from "../../components/header/header";
import SignInDialog from "../../signIn/signIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";

import "./home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [isSignInDialogOpen, setIsSignDialogInOpen] = useState(false);

  const navigate = useNavigate();

  const openSignInDialog = () => {
    setIsSignDialogInOpen(true);
  };

  const closeSignInDialog = () => {
    setIsSignDialogInOpen(false);
  };

  const gotoListItem = () => {
    if (user) {
      navigate("/add-item");
    } else {
      openSignInDialog();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home">
      <Header
        onSignIn={openSignInDialog}
        onListItem={gotoListItem}
        user={user}
      />
      <div className="content">
        <Gallery />
        {isSignInDialogOpen && <SignInDialog onClose={closeSignInDialog} />}
      </div>
    </div>
  );
}

export default Home;

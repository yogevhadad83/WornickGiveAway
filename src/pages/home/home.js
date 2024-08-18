import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/gallery";
import Header from "../../components/header/header";
import SignInDialog from "../../signIn/signIn";
import RegisterDialog from "../../register/register"; // Corrected import
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../index";

import "./home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false); // Corrected state name
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false); // Corrected state name

  const navigate = useNavigate();

  const openRegisterDialog = () => {
    closeSignInDialog();
    setIsRegisterDialogOpen(true);
  };

  const closeRegisterDialog = () => {
    setIsRegisterDialogOpen(false);
  };

  const openSignInDialog = () => {
    closeRegisterDialog();
    setIsSignInDialogOpen(true);
  };

  const closeSignInDialog = () => {
    setIsSignInDialogOpen(false);
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
        onRegister={openRegisterDialog}
        user={user}
      />
      <div className="content">
        <Gallery />
        {isSignInDialogOpen && (
          <SignInDialog
            onClose={closeSignInDialog}
            onRegister={openRegisterDialog}
          />
        )}
        {isRegisterDialogOpen && (
          <RegisterDialog onClose={closeRegisterDialog} />
        )}
      </div>
    </div>
  );
}

export default Home;

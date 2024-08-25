import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "../../components/gallery/gallery";
import SignInDialog from "../../dialogs/signIn/signIn";
import RegisterDialog from "../../dialogs/register/register"; // Corrected import

import "./home.css";
import { useUser } from "../../contexts/user";
import Page from "../../components/page/page";
import Button from "../../components/button/button";

function Home() {
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false); // Corrected state name
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false); // Corrected state name

  const navigate = useNavigate();

  const { user } = useUser();

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

  return (
    <Page
      headerTools={
        <>
          <Button variant="primary" onClick={gotoListItem}>
            List an Item
          </Button>
          {!user && (
            <Button variant="secondary" onClick={openSignInDialog}>
              Sign In
            </Button>
          )}
        </>
      }
    >
      <div className="content">
        <Gallery />
        {isSignInDialogOpen && (
          <SignInDialog
            onClose={closeSignInDialog}
            onOpenRegister={openRegisterDialog}
          />
        )}
        {isRegisterDialogOpen && (
          <RegisterDialog
            onClose={closeRegisterDialog}
            onOpenSignIn={openSignInDialog}
            onRegiste
          />
        )}
      </div>
    </Page>
    // <div className="home">
    //   {/* <Header onOpenSignIn={openSignInDialog} onListItem={gotoListItem} /> */}

    // </div>
  );
}

export default Home;

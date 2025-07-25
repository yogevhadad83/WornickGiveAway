import React, { useCallback, useState } from "react";
import ItemForm from "./itemForm/itemForm";
import ItemPreview from "./itemPreview/itemPreview";
import "./addItem.css";
import Page from "../../components/page/page";
import { useUser } from "../../contexts/user";
import { useFirestore } from "../../contexts/firestore";
import { v4 as uuidv4 } from "uuid";

const AddItem = () => {
  const { user } = useUser();
  const { setDocument } = useFirestore();
  const [formInputs, setFormInputs] = useState({
    title: "",
    condition: "",
    amount: "",
    location: user?.location || "",
    contactName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    notes: "",
    images: []
  });

  const handleInputChange = (e) => {
    setFormInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = useCallback((images) => {
    setFormInputs((prev) => ({ ...prev, images }));
  }, []);

  const handleSubmit = (data) => {
    console.log("Submitting data:", data);
    setDocument("items", uuidv4(), data);
  };

  return (
    <Page closable>
      <div className="add-item-page">
        <ItemForm
          formInputs={formInputs}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
        <ItemPreview images={formInputs.images} formInputs={formInputs} />
      </div>
    </Page>
  );
};

export default AddItem;

// ListItemPage.js
import React, { useState } from "react";
import ItemForm from "./itemForm/itemForm";
import ItemPreview from "./itemPreview/itemPreview";
import "./addItem.css";
import Header from "../../components/header/header";
import { useUser } from "../../contexts/user";

const AddItem = () => {
  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [formInputs, setFormInputs] = useState({
    title: "",
    condition: "",
    amount: "",
    location: "",
    contactName: "",
    phoneNumber: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      <Header user={user} />
      <div className="add-item-page">
        <ItemForm
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
        />
        <ItemPreview
          image={image}
          formInputs={formInputs}
          handleRemoveImage={handleRemoveImage}
          handleImageChange={handleImageChange}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      </div>
    </>
  );
};

export default AddItem;

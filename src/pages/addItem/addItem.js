import React, { useState } from "react";
import ItemForm from "./itemForm/itemForm";
import ItemPreview from "./itemPreview/itemPreview";
import "./addItem.css";
import Page from "../../components/page/page";
import { useUser } from "../../contexts/user";

const AddItem = () => {
  const { user } = useUser();

  const [images, setImages] = useState([]);
  const [formInputs, setFormInputs] = useState({
    title: "",
    condition: "",
    amount: "",
    location: user?.location,
    contactName: user?.fullName,
    phoneNumber: user?.phoneNumber,
    notes: "",
  });

  const handleInputChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (images) => {
    setImages(images);
  };

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page closable>
      <div className="add-item-page">
        <ItemForm
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
        <ItemPreview images={images} formInputs={formInputs} />
      </div>
    </Page>
  );
};

export default AddItem;

import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./itemForm.css";

const ItemForm = ({ formInputs, handleInputChange, handleImageChange, handleSubmit }) => {
  const [localImages, setLocalImages] = useState([]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `wornick-giveaway-images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload progress:", progress);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newImage = { name: file.name, url: downloadURL };
            setLocalImages((prevImages) => [...prevImages, newImage]);
          });
        }
      );
    }
  };

  const handleRemoveImage = (name) => {
    setLocalImages((prevImages) =>
      prevImages.filter((image) => image.name !== name)
    );
  };

  // Update the parent's images state whenever localImages changes
  useEffect(() => {
    handleImageChange(localImages);
  }, [localImages, handleImageChange]);

  const onSubmit = (event) => {
    event.preventDefault();
    // Use the parent’s state which now includes the text inputs and images.
    handleSubmit(formInputs);
  };

  return (
    <form className="item-form" onSubmit={onSubmit}>
      <div className="image-info">
        {localImages.map((image) => (
          <div key={image.name} className="image-name">
            {image.name}{" "}
            <button type="button" onClick={() => handleRemoveImage(image.name)}>x</button>
          </div>
        ))}
      </div>
      <div className="add-image-container">
        <button type="button" onClick={() => document.getElementById("file-upload").click()}>
          Add Image
        </button>
      </div>
      <input
        id="file-upload"
        type="file"
        onChange={handleAddImage}
        style={{ display: "none" }}
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formInputs.title}
        onChange={handleInputChange}
      />
      <select name="condition" value={formInputs.condition} onChange={handleInputChange}>
        <option value="">Condition</option>
        <option value="new">New</option>
        <option value="good">Good</option>
        <option value="used">Used</option>
        <option value="not great">Not Great</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formInputs.amount}
        onChange={handleInputChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formInputs.notes}
        onChange={handleInputChange}
      ></textarea>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ItemForm;

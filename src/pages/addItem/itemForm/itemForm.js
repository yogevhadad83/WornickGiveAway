import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./itemForm.css";

const ItemForm = ({ handleInputChange, handleImageChange, handleSubmit }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  const [images, setImages] = useState([]);

  const addImage = (e) => {
    e.preventDefault();
    document.getElementById("file-upload").click();
  };

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
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImages((prevImages) => [
              ...prevImages,
              { name: file.name, url: downloadURL },
            ]);
          });
        }
      );
    }
  };

  const handleRemoveImage = (name) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.name !== name)
    );
  };

  useEffect(() => {
    handleImageChange(images);
  }, [handleImageChange, images]);

  return (
    <form className="item-form" onSubmit={onSubmit}>
      <div className="image-info">
        {images.map((image) => (
          <div key={image.name} className="image-name">
            {image.name}{" "}
            <button onClick={() => handleRemoveImage(image.name)}>x</button>
          </div>
        ))}
      </div>
      <div className="add-image-container">
        <button onClick={addImage}>Add Image</button>
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
        onChange={handleInputChange}
      />
      <select name="condition" onChange={handleInputChange}>
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
        onChange={handleInputChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleInputChange}
      ></textarea>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ItemForm;

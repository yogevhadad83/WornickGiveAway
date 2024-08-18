import React, { useState } from "react";
import "./itemPreview.css";

const ItemPreview = ({
  image,
  formInputs,
  handleImageChange,
  handleDragOver,
  handleDrop,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="item-preview">
      <div
        className={`image-container ${isDragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => {
          handleDrop(e);
          setIsDragging(false);
        }}
      >
        {image ? (
          <>
            <img src={image} alt="Dropped" />
          </>
        ) : (
          <p>
            Drag an image here or{" "}
            <label htmlFor="file-upload" className="click-to-upload">
              click to upload
            </label>
          </p>
        )}
        <input
          id="file-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="item-details">
        {Object.entries(formInputs).map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ItemPreview;

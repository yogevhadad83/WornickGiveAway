import React, { useState } from "react";
import "./itemPreview.css";

const ItemPreview = ({ images, formInputs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="item-preview">
      <div className="image-container">
        {images.length > 0 && (
          <>
            <button className="nav-button" onClick={handlePrevClick}>
              ◀
            </button>
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].name}
              className="preview-image"
            />
            <button className="nav-button" onClick={handleNextClick}>
              ▶
            </button>
          </>
        )}
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

import React from "react";
import "./dialog.css";

const Dialog = ({ title, children, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;

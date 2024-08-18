// GiveAwayCard.js
import React from "react";
import "./giveAwayCard.css";

const GiveAwayCard = ({
  image,
  title,
  condition,
  amount,
  location = "Foster City",
  contactName,
  phoneNumber,
  notes,
  status = "Availble",
}) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img-top" />
      <div className={`status-indicator ${status}`}></div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">
          <b>Condition:</b> {condition}
        </p>
      </div>
    </div>
  );
};

export default GiveAwayCard;

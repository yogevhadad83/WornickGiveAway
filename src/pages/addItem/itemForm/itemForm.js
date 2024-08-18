// ItemForm.js
import React from "react";
import "./itemForm.css";

const ItemForm = ({ handleInputChange, handleImageChange }) => {
  return (
    <form className="item-form">
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
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="contactName"
        placeholder="Contact Name"
        onChange={handleInputChange}
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
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

import React from "react";
import "./button.css";

const Button = ({ variant, children, ...props }) => {
  return (
    <button className={`btn ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

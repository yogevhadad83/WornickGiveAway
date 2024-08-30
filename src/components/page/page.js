import React from "react";
import "./page.css"; // Import the CSS file
import Header from "../header/header";

const Page = ({ closable, headerTools, children }) => {
  return (
    <div className="page-container">
      <Header closable={closable}>{headerTools}</Header>
      <main className="page-body">{children}</main>
    </div>
  );
};

export default Page;

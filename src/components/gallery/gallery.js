import React, { useState, useEffect } from "react";
import GiveAwayCard from "../giveAwayCard/giveAwayCard";

import "./gallery.css";

const Gallery = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Bike",
      condition: "Good",
      image:
        "https://www.bicycleretailer.com/sites/default/files/images/article/Raleigh_Kodiak_PRO_iE.jpg",
    },
    {
      id: 2,
      title: "Table",
      condition: "Used",
      image:
        "https://www.thespruce.com/thmb/agMCiMTigXWwoplUPJTeHy1wQ6M=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-outdoor-table-plans-5070848-hero-e56542f9054c4a92b888438f5e598fcc.jpg",
    },
    {
      id: 3,
      title: "Chair",
      condition: "Good",
      image:
        "https://m.media-amazon.com/images/I/81suviU3vtL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 4,
      title: "Table",
      condition: "New",
      image: "https://m.media-amazon.com/images/I/61XW27cfpRL.jpg",
    },
  ]);

  useEffect(() => {
    // Replace with your actual API endpoint
    // fetch("https://your-api-endpoint.com/items")
    //   .then((response) => response.json())
    //   .then((data) => setItems(data))
    //   .catch((error) => console.error(error));
  }, []);

  return (
    <div className="gallery">
      {items.map((item) => (
        <GiveAwayCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Gallery;

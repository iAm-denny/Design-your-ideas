import React from "react";

const LoadButton = ({ handleShowFurniture }) => {
  return (
    <div className="load-container">
      <h1>Dreams do come true</h1>
      <button className="load_furniture" onClick={handleShowFurniture}>
        Load a furnitures
      </button>
    </div>
  );
};

export default LoadButton;

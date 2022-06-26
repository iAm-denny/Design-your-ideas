import React, { useState, useEffect } from "react";
import JsonData from "../assets/floorplan-sample.json";
import { itemsConfig } from "../assets/itemsConfig";

const Exmaple = ({ handleHideFurniture }) => {
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    let items = [];

    JsonData.layout.map((data, index) => {
      items.push({
        points: data.tag == "polygon" && data.points,
        d: data.tag == "path" && data.d,
        tag: data.tag,
        background:
          data.tag == "path"
            ? itemsConfig[6].background
            : itemsConfig[index].background,
        borderColor:
          data.tag == "path"
            ? itemsConfig[6].borderColor
            : itemsConfig[index].borderColor,
      });
    });
    setFurnitures(items);
  }, []);
  return (
    <div className="example-container">
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 40,
          cursor: "pointer",
        }}
        onClick={handleHideFurniture}
      >
        {"< "}Back
      </div>
      <svg style={{ height: "50vh" }}>
        {furnitures.map((data, index) => {
          return data.tag == "polygon" ? (
            <g>
              <polygon
                points={data.points}
                key={index}
                style={{
                  fill: data.background,
                  stroke: data.borderColor,
                  strokeWidth: 1,
                  scale: 0.5,
                  transform: "scale(0.4)",
                }}
              />
            </g>
          ) : (
            <g>
              <path
                d={data.d}
                key={index}
                style={{
                  fill: data.background,
                  strokeWidth: 3,
                  stroke: data.borderColor,
                  transform: "scale(0.4)",
                }}
              />
            </g>
          );
        })}
      </svg>
      <div>You can build like this.</div>
    </div>
  );
};

export default Exmaple;

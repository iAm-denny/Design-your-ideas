import { useState, useEffect } from "react";
import JsonData from "./assets/floorplan-sample.json";
import { itemsConfig } from "./assets/itemsConfig";
import "./App.css";
import Floorplan from "./components/Floorplan";

function App() {
  const [showFloor, setShowFloor] = useState(false);
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    let items = [];
    JsonData.layout.map((data, index) => {
      items.push({
        points:
          data.tag == "polygon" && data.points.replaceAll(" ", ",").split(","),
        d: data.tag == "path" && data.d,
        tag: data.tag,
        id: data.id,
        x: itemsConfig[index]?.x && itemsConfig[index].x,
        y: itemsConfig[index]?.y && itemsConfig[index].y,
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

  const toggleFurniture = () => {
    setShowFloor((prev) => !prev);
  };

  const resetItems = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="load_furniture_container">
        <button className="load_furniture" onClick={toggleFurniture}>
          {showFloor ? "Hide" : "Show"} Furnitures
        </button>
        <button onClick={resetItems}>Reset Furnitures</button>
      </div>
      {showFloor && (
        <div className="floorplan_container">
          <Floorplan furnitures={furnitures} />
        </div>
      )}
    </div>
  );
}

export default App;

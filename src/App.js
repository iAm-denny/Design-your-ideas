import { useState, useEffect } from "react";
import JsonData from "./assets/floorplan-sample.json";
import { itemsConfig, iconsConfig } from "./assets/itemsConfig";
import "./App.css";
import { ReactSortable } from "react-sortablejs";
import FloorplanList from "./components/FloorplanList";

function App() {
  const [showFloor, setShowFloor] = useState(false);
  const [furnitures, setFurnitures] = useState([]);
  const [displayFurnitures, setDisplayFurnitures] = useState([]);

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
      <div className="navigation_container">
        <div id="logo">Homezz</div>
        <div className="navigation_items">
          <ReactSortable
            group={{
              name: "groupName",
              pull: "clone",
              put: false,
            }}
            sort={false}
            list={furnitures}
            setList={setFurnitures}
            className="nav-items"
          >
            {iconsConfig.map((item) => {
              return (
                <div title={item.name}>
                  <img src={item.path} width="20px" height="20px" />
                </div>
              );
            })}
          </ReactSortable>
          <div className="nav-btn">Show Exmaple</div>
        </div>
      </div>

      <div className="container">
        <ReactSortable
          sort={true}
          group={{
            name: "groupName",
            pull: false,
            put: true,
          }}
          animation={0}
          delayOnTouchStart={false}
          delay={0}
          list={displayFurnitures}
          setList={setDisplayFurnitures}
          dragoverBubble={false}
          draggable=" "
          clone={(item) => ({ ...item, id: Math.random().toString() })}
        >
          <FloorplanList
            displayFurnitures={displayFurnitures}
            setDisplayFurnitures={setDisplayFurnitures}
          />
        </ReactSortable>
      </div>
    </div>
  );
}

export default App;

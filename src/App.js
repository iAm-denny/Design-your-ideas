import { useState, useEffect, useRef } from "react";
import JsonData from "./assets/floorplan-sample.json";
import { itemsConfig, iconsConfig } from "./assets/itemsConfig";
import { ReactSortable } from "react-sortablejs";
import FloorplanList from "./components/FloorplanList";
import LoadButton from "./components/LoadButton";
import Exmaple from "./components/Exmaple";
import { ReactComponent as ArrowPointerIcon } from "./assets/arrow-pointer.svg";
import { ReactComponent as HandPointerIcon } from "./assets/handPointer.svg";
import "./App.css";

function App() {
  const [showFloor, setShowFloor] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [furnitures, setFurnitures] = useState([]);
  const [displayFurnitures, setDisplayFurnitures] = useState([]);
  const [isSelectShape, setIsSelectShape] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [cursor, setCursor] = useState("arrow");

  useEffect(() => {
    let items = [];

    iconsConfig.map((data, index) => {
      const search = JsonData.layout.find((layout) => layout.id == data.name);
      if (search || data.tag == "path") {
        items.push({
          name: data.name,
          tag: data?.tag == "path" ? "path" : "polygon",
          id: data?.tag == "path" ? "path" : data.name,
          points:
            search &&
            search.tag == "polygon" &&
            data.tag !== "path" &&
            search.points.replaceAll(" ", ",").split(","),
          d: data.tag == "path" && data.name,

          background:
            data.tag == "path"
              ? itemsConfig[6].background
              : itemsConfig[index]
              ? itemsConfig[index].background
              : "#000",
          borderColor:
            data.tag == "path"
              ? itemsConfig[6].borderColor
              : itemsConfig[index]
              ? itemsConfig[index].borderColor
              : "#000",
          iconPath: data.path,
        });
      }
    });

    setFurnitures(items);
  }, []);

  const handleRemove = (e) => {
    let cloneFurniture = [...displayFurnitures];
    let data = cloneFurniture.filter((c) => c.id != selectedShapeId);

    setIsSelectShape(false);
    setSelectedShapeId(null);
    localStorage.setItem("data-furnitures", JSON.stringify(data));
    setDisplayFurnitures(data);
  };

  const handleSelectShape = (id) => {
    setIsSelectShape(true);
    setSelectedShapeId(id);
  };

  const handleShowFurniture = () => {
    setShowFloor(true);
    setShowExample(false);
  };

  const handleShowExmaple = () => {
    setShowExample(true);
    setShowFloor(true);
  };

  const handleHideFurniture = () => {
    setShowExample(false);
    setShowFloor(true);
  };

  useEffect(() => {
    const localFurnitures = localStorage.getItem("data-furnitures");
    if (localFurnitures) {
      const parseData = JSON.parse(localFurnitures);
      if (parseData && parseData.length > 0) {
        setDisplayFurnitures(parseData);
      }
    }
  }, []);

  useEffect(() => {
    if (displayFurnitures && displayFurnitures.length > 0) {
      localStorage.setItem(
        "data-furnitures",
        JSON.stringify(displayFurnitures)
      );
    }
  }, [displayFurnitures]);

  console.log("displayFurnitures", displayFurnitures);

  const resetFurniture = () => {
    localStorage.setItem("data-furnitures", null);
    window.location.reload();
  };

  return (
    <div className="App">
      {!showFloor ? (
        <LoadButton handleShowFurniture={handleShowFurniture} />
      ) : showExample ? (
        <Exmaple handleHideFurniture={handleHideFurniture} />
      ) : (
        <>
          <div className="navigation_container">
            <div id="logo">Homezz</div>
            <div className="navigation_items">
              <div
                className="nav-item-pointer"
                onClick={() => {
                  setIsSelectShape(false);
                  setSelectedShapeId(null);
                  setCursor("arrow");
                }}
              >
                <ArrowPointerIcon fill="#ABABAB" width={20} height={20} />
              </div>
              <div
                className="nav-item-pointer"
                onClick={() => {
                  setIsSelectShape(false);
                  setSelectedShapeId(null);
                  setCursor("hand");
                }}
              >
                <HandPointerIcon fill="#ABABAB" width={20} height={20} />
              </div>
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
              <div className="nav-btn-remove" onClick={resetFurniture}>
                Reset
              </div>
              {isSelectShape && selectedShapeId && (
                <div className="nav-btn-remove" onClick={handleRemove}>
                  Remove
                </div>
              )}
              <div className="nav-btn" onClick={handleShowExmaple}>
                Show Exmaple
              </div>
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
              clone={(item) => ({
                ...item,
                id: Math.random().toString(),
                x: window.innerWidth / 2.5,
                y: window.innerHeight / 3,
              })}
            >
              <FloorplanList
                displayFurnitures={displayFurnitures}
                setDisplayFurnitures={setDisplayFurnitures}
                selectedShapeId={selectedShapeId}
                handleSelectShape={handleSelectShape}
                setIsSelectShape={setIsSelectShape}
                cursor={cursor}
              />
            </ReactSortable>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

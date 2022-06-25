import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import ViewFloorItem from "./ViewFloorItem";

const FloorplanList = ({ displayFurnitures, setDisplayFurnitures }) => {
  const [isSelect, setIsSelect] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setIsSelect(true);
    setSelectedId(id);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && isSelect && selectedId) {
        let cloneFurniture = displayFurnitures;

        let data = cloneFurniture.filter((c) => c.id != selectedId);

        setDisplayFurnitures(data);
      }
    });
  }, [selectedId]);

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 60}
        draggable
        zIndex={-1}
        onClick={(e) => {
          e.isTrusted = false;
          setIsSelect(false);
          setSelectedId(null);
        }}
      >
        {displayFurnitures.map((item) => (
          <Layer
            style={{
              cursor: "move",
              border: "1px solid red",
            }}
            key={item.id}
          >
            <ViewFloorItem
              item={item}
              displayFurnitures={displayFurnitures}
              setDisplayFurnitures={setDisplayFurnitures}
              handleClick={handleClick}
              selectedId={selectedId}
            />
          </Layer>
        ))}
      </Stage>
    </div>
  );
};

export default FloorplanList;

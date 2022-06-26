import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import ViewFloorItem from "./ViewFloorItem";

const FloorplanList = (props) => {
  const {
    displayFurnitures,
    setDisplayFurnitures,
    selectedShapeId,
    setIsSelectShape,
    handleSelectShape,
    cursor,
  } = props;

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 60}
        draggable={cursor == "hand"}
        style={{ cursor: cursor == "hand" && "grab" }}
        onMouseDown={(e) => {
          if (cursor == "hand") {
            const container = e.target.getStage().container();
            container.style.cursor = "grabbing";
          }
        }}
        onMouseUp={(e) => {
          if (cursor == "hand") {
            const container = e.target.getStage().container();
            container.style.cursor = "grab";
          }
        }}
        onClick={() => {
          setIsSelectShape(false);
          handleSelectShape(null);
        }}
      >
        {displayFurnitures.map((item) => (
          <Layer key={item.id}>
            <ViewFloorItem
              item={item}
              displayFurnitures={displayFurnitures}
              setDisplayFurnitures={setDisplayFurnitures}
              handleSelectShape={handleSelectShape}
              selectedShapeId={selectedShapeId}
              cursor={cursor}
            />
          </Layer>
        ))}
      </Stage>
    </div>
  );
};

export default FloorplanList;

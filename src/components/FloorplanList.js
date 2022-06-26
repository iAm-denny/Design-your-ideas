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
  } = props;

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 60}
        draggable
        style={{ cursor: "grab" }}
        onMouseDown={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "grabbing";
        }}
        onMouseUp={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "grab";
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
            />
          </Layer>
        ))}
      </Stage>
    </div>
  );
};

export default FloorplanList;

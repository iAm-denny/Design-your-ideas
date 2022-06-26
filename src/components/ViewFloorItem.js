import React, { useState } from "react";
import { Group, Line, Path, Rect } from "react-konva";

const ViewFloorItem = (props) => {
  const {
    item,
    displayFurnitures,
    setDisplayFurnitures,
    handleClick,
    selectedShapeId,
    handleSelectShape,
    cursor,
  } = props;

  const handleDragStart = (e) => {
    const id = e.target.attrs.name;
    const cloneFurniture = displayFurnitures.slice();
    const searchItem = cloneFurniture.find((item) => item.id == id);
    const searchIndex = cloneFurniture.indexOf(item);
    cloneFurniture.splice(searchIndex, 1);
    cloneFurniture.push(searchItem);
    setDisplayFurnitures(cloneFurniture);
  };

  const x = window.innerWidth / 2.5;
  const y = window.innerHeight / 3;

  return item.tag == "polygon" ? (
    <Group
      onDragStart={handleDragStart}
      onClick={(e) => {
        e.cancelBubble = true;
        if (cursor == "arrow") {
          handleSelectShape(item.id);
        }
      }}
      draggable={cursor == "hand"}
      name={item.id}
      x={x}
      y={y}
    >
      <Line
        points={item.points}
        fill={item.background}
        stroke={selectedShapeId == item.id ? "red" : item.borderColor}
        closed
        scale={{
          x: 0.3,
          y: 0.3,
        }}
        onMouseUp={(e) => {
          if (cursor == "hand") {
            const container = e.target.getStage().container();
            container.style.cursor = "grab";
          }
        }}
        onMouseDown={(e) => {
          if (cursor == "hand") {
            const container = e.target.getStage().container();
            container.style.cursor = "grabbing";
          }
        }}
      />
    </Group>
  ) : (
    <Group
      draggable={cursor == "hand"}
      name={item.id}
      onDragStart={handleDragStart}
      onMouseUp={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grab";
        }
      }}
      onMouseDown={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grabbing";
        }
      }}
    >
      <Path
        data={item.d}
        fill={item.background}
        stroke={selectedShapeId == item.id ? "red" : item.borderColor}
        onClick={(e) => {
          e.cancelBubble = true;
          if (cursor == "arrow") {
            handleSelectShape(item.id);
          }
        }}
        x={x}
        y={y}
        strokeWidth={8}
        scale={{
          x: 0.4,
          y: 0.4,
        }}
      />
    </Group>
  );
};

export default ViewFloorItem;

import React, { useState } from "react";
import { Group, Line, Path, Rect } from "react-konva";

const ViewFloorItem = ({
  item,
  displayFurnitures,
  setDisplayFurnitures,
  handleClick,
  selectedId,
}) => {
  const handleDragStart = (e) => {
    const id = e.target.attrs.name;
    const cloneFurniture = displayFurnitures.slice();
    const searchItem = cloneFurniture.find((item) => item.id == id);
    const searchIndex = cloneFurniture.indexOf(item);
    cloneFurniture.splice(searchIndex, 1);
    cloneFurniture.push(searchItem);
    setDisplayFurnitures(cloneFurniture);
  };

  const handleClickShape = (e) => {
    e.cancelBubble = true;
    handleClick(item.id);
  };

  return item.tag == "polygon" ? (
    <Group
      onDragStart={handleDragStart}
      onClick={handleClickShape}
      draggable
      name={item.id}
      style={{
        position: "relative",
        zIndex: 1,
      }}
      zIndex={1}
    >
      <Line
        points={item.points}
        fill={item.background}
        stroke={selectedId == item.id ? "red" : item.borderColor}
        closed
        scale={{
          x: 0.5,
          y: 0.5,
        }}

        // onMouseOver={(e) => {
        //   const container = e.target.getStage().container();
        //   container.style.cursor = "grab";
        // }}
        // onMouseDown={(e) => {
        //   const container = e.target.getStage().container();
        //   container.style.cursor = "grabbing";
        // }}
        // onMouseUp={(e) => {
        //   const container = e.target.getStage().container();
        //   container.style.cursor = "grab";
        // }}
      />
    </Group>
  ) : (
    <Group draggable name={item.id} onDragStart={handleDragStart}>
      <Path
        data={item.d}
        fill={item.background}
        stroke={selectedId == item.id ? "red" : item.borderColor}
        onClick={handleClickShape}
        strokeWidth={5}
      />
    </Group>
  );
};

export default ViewFloorItem;

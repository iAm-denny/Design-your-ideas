import React from "react";
import { Layer, Stage, Line, Path, Group, Text, Label, Tag } from "react-konva";
import FloorItem from "./FloorItem";
const Floorplan = ({ furnitures }) => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {furnitures.map((item, index) => (
          <FloorItem item={item} index={index} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Floorplan;

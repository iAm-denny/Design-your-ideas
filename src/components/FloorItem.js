import React from "react";
import { Line, Path, Group, Text, Label, Tag } from "react-konva";

const FloorItem = ({ item, index }) => {
  return item.tag == "polygon" ? (
    <Group draggable>
      <Line
        points={item.points}
        fill={item.background}
        stroke={item.borderColor}
        closed
        key={index}
      />
      <Text
        text={item.id}
        x={item.x && item.x}
        y={item.y && item.y}
        closed
        fontSize={17}
        fill={item.borderColor}
        fontStyle="bold"
      />
    </Group>
  ) : (
    <Group draggable>
      <Path
        data={item.d}
        fill={item.background}
        stroke={item.borderColor}
        key={index}
        strokeWidth={3}
      />
    </Group>
  );
};

export default FloorItem;

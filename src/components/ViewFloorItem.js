import React, { useState, useEffect } from "react";
import { Line, Path, Rect, Transformer } from "react-konva";

const ViewFloorItem = (props) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const {
    item,
    displayFurnitures,
    setDisplayFurnitures,
    handleClick,
    selectedShapeId,
    handleSelectShape,
    cursor,
  } = props;

  useEffect(() => {
    if (selectedShapeId == item.id) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedShapeId]);

  const updateItemValue = (id, value, hasValue) => {
    const cloneFurniture = [...displayFurnitures];
    const searchItem = cloneFurniture.find((item) => item.id == id);
    if (hasValue && value) {
      const newData = { ...searchItem, ...value };
      const searchIndex = cloneFurniture.indexOf(item);
      cloneFurniture.splice(searchIndex, 1);
      cloneFurniture.push(newData);
    } else {
      const searchIndex = cloneFurniture.indexOf(item);
      cloneFurniture.splice(searchIndex, 1);
      cloneFurniture.push(searchItem);
    }
    setDisplayFurnitures(cloneFurniture);
  };

  const handleDragStart = (e) => {
    const id = e.target.attrs.name;
    updateItemValue(id, null, false);
  };

  const handleDragEnd = (e) => {
    const id = e.target.attrs.name;
    const data = {
      x: e.target.x(),
      y: e.target.y(),
    };
    updateItemValue(id, data, true);
  };

  const handleTransformEnd = (e) => {
    const id = e.target.attrs.name;
    const data = {
      x: e.target.x(),
      y: e.target.y(),
      scaleX: e.target.scaleX(),
      scaleY: e.target.scaleY(),
      rotation: e.target.rotation(),
    };
    updateItemValue(id, data, true);
  };

  return item.tag == "polygon" ? (
    <>
      <Line
        points={item.points}
        ref={shapeRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable={cursor == "hand"}
        name={item.id}
        onClick={(e) => {
          e.cancelBubble = true;
          if (cursor == "arrow") {
            handleSelectShape(item.id);
          }
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
        x={item.x}
        y={item.y}
        fill={item.background}
        stroke={item.borderColor}
        closed
        scaleX={item.scaleX}
        scaleY={item.scaleY}
        rotation={item.rotation}
        onTransformEnd={handleTransformEnd}
      />
      {selectedShapeId == item.id && <Transformer ref={trRef} />}
    </>
  ) : (
    <>
      <Path
        data={item.d}
        ref={shapeRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        draggable={cursor == "hand"}
        name={item.id}
        onClick={(e) => {
          e.cancelBubble = true;
          if (cursor == "arrow") {
            handleSelectShape(item.id);
          }
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
        x={item.x}
        y={item.y}
        fill={item.background}
        stroke={item.borderColor}
        strokeWidth={8}
        scaleX={item.scaleX}
        scaleY={item.scaleY}
        rotation={item.rotation}
        onTransformEnd={handleTransformEnd}
      />
      {selectedShapeId == item.id && <Transformer ref={trRef} />}
    </>
  );
};

export default ViewFloorItem;

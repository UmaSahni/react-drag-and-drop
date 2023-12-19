import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const Players = ({ item, name, index, type, onDropPlayer }) => {
  const [{ isDraggable }, dragRef] = useDrag({
    type:type,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item) {
        onDropPlayer(item);
      }
    },
    collect : (monitor)=>({
        isDragging: monitor.isDragging()
    })
  });
  return (
    <ListItem
    ref={dragRef}
      p={2}
      borderRadius={"md"}
      boxShadow={"md"}
      mb={2}
      textAlign={"center"}
      bg={
        isDraggable ? (type == "Player" ? "yellow.600" : "teal.400") : "white"
      }
    >
      {name}
    </ListItem>
  );
};

export default Players;

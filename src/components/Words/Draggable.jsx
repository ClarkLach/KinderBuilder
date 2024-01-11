import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./words.css";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    zIndex: 1000
  };

  attributes.className = "word";

  // Click Event that calls addWordToSentence() in App.jsx
  listeners.onClick = () => {
    props.onWordClick(props.id);
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
}

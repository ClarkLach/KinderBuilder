import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: props.word });

// Shows correct style when word isn't being dragged
  attributes.className = "word";

  // Click Event that calls addWordToSentence() in App.jsx
  listeners.onClick = () => {
    props.onWordClick(props.word);
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {props.word}
    </div>
  );
}

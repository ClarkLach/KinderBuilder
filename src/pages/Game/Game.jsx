import { useState } from "react";
import "./Game.css";
import SightWords from "../../components/Words/SightWords";
import Nouns from "../../components/Words/Nouns";
import Search from "../../components/Search/Search";
import Trashcan from "../../components/Trashcan/Trashcan";
import Puncuation from "../../components/Puncuation/Puncuation";
import Item from "../../components/Words/Item";

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
} from "@dnd-kit/sortable";

import { SortableItem } from "../../components/Words/SortableItem";

function Game() {
  // Adding/Removing words from sentence
  const [sentence, setSentence] = useState([]);
  const [count, setCount] = useState(0);

  function capitalizeFirstLetter(arr) {
    if (arr.length > 0) {
      arr[0] = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
    }
    setSentence(arr);
  }

  function clearSentence() {
    setSentence([]);
  }

  function addWordToSentence(word) {
    const updatedSentence = [...sentence];
    updatedSentence.push(word);
    capitalizeFirstLetter(updatedSentence);
    console.log("word added: " + word);
    setSentence(updatedSentence);

    setCount(count + 1);
    console.log("count: " + count);
  }

  function removeWord(index) {
    console.log("word removed: " + sentence[index] + " at index: " + index);
    const updatedSentence = sentence.filter((_, i) => i !== index);
    capitalizeFirstLetter(updatedSentence);
    setSentence(updatedSentence);
  }

  // Drag and Drop Functionality
  const [activeWord, setActiveWord] = useState(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragStart(event) {
    setActiveWord(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSentence((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveWord(null);
  }

  return (
    <>
      <SightWords addWordToSentence={addWordToSentence}/>

      <div className="sentencebuilder">
        <div className="title">KinderBuilder</div>
        <Search onChange={addWordToSentence} />
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <div className="sentence-text">
            <SortableContext items={sentence}>
              {sentence.map((word, index) => {
                return (
                  <SortableItem
                    key={index}
                    id={index}
                    value={word}
                    onWordClick={removeWord}
                    sentence={sentence}
                  />
                );
              })}
            </SortableContext>
          </div>
          <DragOverlay>
            {activeWord ? <Item value={activeWord} /> : null}
          </DragOverlay>
        </DndContext>

        <Puncuation onWordClick={addWordToSentence} />
        <Trashcan clearSentence={clearSentence} />
      </div>

      <Nouns addWordToSentence={addWordToSentence} />
    </>
  );
}

export default Game;

import { useState } from "react";
import React from "react";
import "./Game.css";
import { sight_words } from "../../components/Words/SightWords";
import { nouns } from "../../components/Words/Nouns";
import Search from "../../components/Search/Search";
import Trashcan from "../../components/Trashcan/Trashcan";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import Puncuation from "../../components/Puncuation/Puncuation";
import SentenceReader from "../../components/SentenceReader/SentenceReader";
import Item from "../../components/Words/Item";
import Backend from "../../components/Backend/Backend";

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
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { Draggable } from "../../components/Words/Draggable";
import { Droppable } from "../../components/Words/Droppable";
import { SortableItem } from "../../components/Words/SortableItem";
import { v4 as uuidv4 } from "uuid";

function Game() {
  // Adding/Removing words from sentence
  const [sentence, setSentence] = useState([]);

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
  }

  function removeWord(index) {
    console.log("word removed: " + sentence[index] + " at index: " + index);
    const updatedSentence = sentence.filter((_, i) => i !== index);
    capitalizeFirstLetter(updatedSentence);
    setSentence(updatedSentence);
  }

  // Search Functionality
  function getWords() {
    const all_words = nouns.concat(sight_words);
    const sorted_words = all_words.slice().sort((a, b) => a.localeCompare(b));
    return sorted_words;
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
  }

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <div className="sightwords">
          <div className="title">Sight Words</div>
          <SortableContext items={sight_words}>
          {sight_words.map((word) => {
            return (
              <Draggable
                key={word}
                id={word}
                word={word}
                onWordClick={addWordToSentence}
              >
                <Item value={word} />
              </Draggable>
            );
          })}
          </SortableContext>
        </div>

        <div className="sentencebuilder">
          <div className="title">KinderBuilder</div>
          <WelcomeUser />
          <Search words={getWords()} onChange={addWordToSentence} />

          <div className="sentence-text" sentence={sentence}>
            <SortableContext items={sentence}>
              {sentence.map((word) => {
                const id = uuidv4();
                return (
                  <SortableItem
                    key={id}
                    id={id}
                    word={word}
                    onWordClick={removeWord}
                    sentence={sentence}
                  />
                );
              })}
            </SortableContext>
          </div>

          <Backend sentence={sentence}/>

          <Puncuation onWordClick={addWordToSentence} />
          <SentenceReader sentence={sentence} />
          <Trashcan clearSentence={clearSentence} />
        </div>
        <div className="nouns">
          {nouns.map((word) => {
            return (
              <Draggable
                key={word}
                id={word}
                word={word}
                onWordClick={addWordToSentence}
              >
                <Item value={word} />
              </Draggable>
            );
          })}
        </div>

        <DragOverlay>
          {activeWord ? <Item value={activeWord} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default Game;

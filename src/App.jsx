import { useState } from "react";
import "./index.css";
import { sight_words } from "./components/Words/SightWords";
import Nouns, { nouns } from "./components/Words/Nouns";
import Search from "./components/Search/Search";
import Trashcan from "./components/Trashcan/Trashcan";
import SentenceText from "./components/SentenceText/SentenceText";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
import Puncuation from "./components/Puncuation/Puncuation";
import SentenceReader from "./components/SentenceReader/SentenceReader";

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
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { Draggable } from "./components/Words/Draggable";
import { Droppable } from "./components/Words/Droppable";

function App() {
  // Adding/Removing words from sentence
  const [sentence, setSentence] = useState([]);

  function addWordToSentence(word) {
    console.log("word added: " + word);
    setSentence((prevSentence) => [...prevSentence, word]);
  }

  function clearSentence() {
    setSentence([]);
  }

  function removeWord(word, index) {
    console.log("word removed: " + word + " at index: " + index);
    setSentence((prevSentence) => prevSentence.filter((_, i) => i !== index));
  }

  // Search Functionality
  function getWords() {
    const all_words = nouns.concat(sight_words);
    const sorted_words = all_words.slice().sort((a, b) => a.localeCompare(b));
    return sorted_words;
  }

  // Drag and Drop Functionality
  const [dndSightWords] = useState(sight_words);
  const [dndNouns] = useState(nouns);
  const [activeId, setActiveId] = useState(null);
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
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  return (
    <>
      <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
      <div className="sightwords">
        <div className="title">Sight Words</div>
          {dndSightWords.map((id) => (
            <Draggable key={id} id={id} onWordClick={addWordToSentence}/>
          ))}
      </div>
      <div className="sentencebuilder">
        <div className="title">KinderBuilder</div>
        <WelcomeUser />
        <Search words={getWords()} onChange={addWordToSentence} />

        <SentenceText sentence={sentence} onWordClick={removeWord} />

        <Puncuation onWordClick={addWordToSentence} />
        <SentenceReader sentence={sentence} />
        <Trashcan clearSentence={clearSentence} />
      </div>
      <div>
        <Nouns onWordClick={addWordToSentence} />
      </div>
      </DndContext>
    </>
  );
}

export default App;

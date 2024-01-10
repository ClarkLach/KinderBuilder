import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import SightWords, {sight_words} from "./components/Words/SightWords";
import Nouns, { nouns } from "./components/Words/Nouns";
import Search from "./components/Search/Search";
import Trashcan from "./components/Trashcan/Trashcan";
import SentenceText from "./components/SentenceText/SentenceText";
import WelcomeUser from "./components/WelcomeUser/WelcomeUser";
import Puncuation from "./components/Puncuation/Puncuation";
import SentenceReader from "./components/SentenceReader/SentenceReader";

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

  return (
    <>
      <div>
        <SightWords onWordClick={addWordToSentence} />
      </div>
      <div className="sentencebuilder">
        <div className="title">Sentence Builder</div>
        <WelcomeUser />
        <Search words={getWords()} onChange={addWordToSentence}/>
        <SentenceText sentence={sentence} onWordClick={removeWord} />
        <Puncuation onWordClick={addWordToSentence} />
        <SentenceReader sentence={sentence} />
        <Trashcan clearSentence={clearSentence} />
      </div>
      <div>
        <Nouns onWordClick={addWordToSentence} />
      </div>
    </>
  );
}

export default App;

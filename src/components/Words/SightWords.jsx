import { useState, useEffect } from "react";
import Item from "./Item";

const SightWords = ({ addWordToSentence }) => {
  const [sightWords, setSightWords] = useState([]);

  useEffect(() => {
    // Load words from localStorage
    const storedData = localStorage.getItem("sight-words");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // If you stored objects like { word, listName }, map to just the word text
        const wordsOnly = parsed.map((entry) =>
          typeof entry === "string" ? entry : entry.word
        );
        setSightWords(wordsOnly);
      } catch (error) {
        console.error("Error parsing sight words from localStorage:", error);
      }
    } else {
      setSightWords([]); // No words yet
    }
  }, []); // Run once on mount

  return (
    <div className="sightwords">
      <div className="title">Sight Words</div>

      {sightWords.length === 0 ? (
        <div className="empty">No sight words available.</div>
      ) : (
        sightWords.map((index, word) => (
          <Item
            key={index}
            id={index}
            value={word}
            onWordClick={addWordToSentence}
          />
        ))
      )}
    </div>
  );
};

export default SightWords;

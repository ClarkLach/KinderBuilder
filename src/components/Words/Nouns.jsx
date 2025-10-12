import { useState, useEffect } from "react";
import Item from "./Item";

const Nouns = ({ addWordToSentence }) => {
  const [nouns, setNouns] = useState([]);

  useEffect(() => {
    // Load nouns from localStorage
    const storedData = localStorage.getItem("nouns");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // If items are objects like { word, listName }, extract just the word text
        const wordsOnly = parsed.map((entry) =>
          typeof entry === "string" ? entry : entry.word
        );
        setNouns(wordsOnly);
      } catch (error) {
        console.error("Error parsing nouns from localStorage:", error);
      }
    } else {
      setNouns([]); // No words yet
    }
  }, []); // Run once on mount

  return (
    <div className="nouns">
      <div className="title">Topic Words</div>

      {nouns.length === 0 ? (
        <div className="empty">No topic words available.</div>
      ) : (
        nouns.map((index, word) => (
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

export default Nouns;

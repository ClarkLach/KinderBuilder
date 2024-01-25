import React, { useState, useEffect } from "react";
import Item from "./Item";

const SightWords = ({ addWordToSentence }) => {
  const [sightWords, setSightWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://kinderbuilder.org/api/sight-words-only"
        );
        const data = await response.json();
        setSightWords(data);
      } catch (error) {
        console.error("Error fetching sight words:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  console.log(sightWords);

  return (
    <div className="sightwords">
      <div className="title">Sight Words</div>

      {sightWords.map((word) => {
        return (
          <Item
            key={word}
            id={word}
            value={word}
            onWordClick={addWordToSentence}
          />
        );
      })}
    </div>
  );
};

export default SightWords;

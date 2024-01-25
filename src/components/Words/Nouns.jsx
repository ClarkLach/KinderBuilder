import React, { useState, useEffect } from "react";
import Item from "./Item";

const Nouns = ({ addWordToSentence }) => {
  const [nouns, setnouns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://kinderbuilder.org/api/nouns-only");
        const data = await response.json();
        setnouns(data);
      } catch (error) {
        console.error("Error fetching nouns:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  console.log(nouns);
  return (
    <div className="nouns">
      <div className="title">Nouns</div>
      {nouns.map((word) => {
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

export default Nouns;

import CreatableSelect from "react-select/creatable";
import React, { useState, useEffect } from "react";
import "./search.css";

function Search({ onChange }) {
  const [sightWords, setSightWords] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [combinedWords, setCombinedWords] = useState([]);

  useEffect(() => {
    // Fetch words from localStorage
    const storedSightWords = JSON.parse(localStorage.getItem("sight-words") || "[]");
    const storedNouns = JSON.parse(localStorage.getItem("nouns") || "[]");

    // Both sightWords and nouns are objects { word, listName }, so extract word
    setSightWords(storedSightWords.map((w) => w.word));
    setNouns(storedNouns.map((w) => w.word));
  }, []);

  useEffect(() => {
    setCombinedWords([...sightWords, ...nouns]);
  }, [sightWords, nouns]);

  const arrayElements = combinedWords.map((opt) => ({
    label: opt,
    value: opt,
  }));

  const customStyles = {
    option: (defaultStyles) => ({
      ...defaultStyles,
      textAlign: "center",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      padding: "10px",
      border: "2px solid #fff",
      boxShadow: "5px 5px 5px rgba(0,0,0,0.3)",
    }),
  };

  const handleChange = (selectedOption) => {
    if (!selectedOption) return;
    onChange(selectedOption.value);
  };

  return (
    <div className="search">
      <CreatableSelect
        className="search-bar"
        placeholder="Type a word.."
        styles={customStyles}
        options={arrayElements}
        onChange={handleChange}
        formatCreateLabel={(userInput) => "Add " + userInput}
      />
    </div>
  );
}

export default Search;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  const [sightWords, setSightWords] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");
  const [newSightInput, setNewSightInput] = useState("");
  const [newNounsInput, setNewNounsInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSightWords();
    fetchNouns();
  }, []);

  const fetchSightWords = () => {
    try {
      const storedData = localStorage.getItem("sight-words");
      const data = storedData ? JSON.parse(storedData) : [];
      setSightWords(data);
    } catch (error) {
      console.error("Error fetching sight words from localStorage:", error);
    }
  };

  const fetchNouns = () => {
    try {
      const storedData = localStorage.getItem("nouns");
      const data = storedData ? JSON.parse(storedData) : [];
      setNouns(data);
    } catch (error) {
      console.error("Error fetching nouns from localStorage:", error);
    }
  };

  const handleDeleteWord = (table, index) => {
    try {
      // Get the current list from localStorage
      const storedData = JSON.parse(localStorage.getItem(table)) || [];

      // Remove the word at the given index
      const updatedData = storedData.filter((_, i) => i !== index);

      // Save the updated list back to localStorage
      localStorage.setItem(table, JSON.stringify(updatedData));

      // Refresh the state
      if (table === "sight-words") {
        fetchSightWords();
      } else if (table === "nouns") {
        fetchNouns();
      }
    } catch (error) {
      console.error("Error deleting word from localStorage:", error);
    }
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleAddWords = (table, listName) => {
    let wordsArray;

    if (table === "sight-words") {
      wordsArray = newSightInput
        .split("\n")
        .filter((word) => word.trim() !== "");
    } else {
      wordsArray = newNounsInput
        .split("\n")
        .filter((word) => word.trim() !== "");
    }

    if (wordsArray.length === 0) {
      alert("Please enter at least one word.");
      return;
    }

    try {
      // Get existing words from localStorage
      const existingData = JSON.parse(localStorage.getItem(table)) || [];

      // Add the new words
      const updatedData = [
        ...existingData,
        ...wordsArray.map((word) => ({ word, listName })),
      ];

      // Save back to localStorage
      localStorage.setItem(table, JSON.stringify(updatedData));

      // Refresh the state
      if (table === "sight-words") {
        fetchSightWords();
        setNewSightInput("");
      } else if (table === "nouns") {
        fetchNouns();
        setNewNounsInput("");
      }
    } catch (error) {
      console.error("Error adding words to localStorage:", error);
    }
  };

  return (
    <>
    <button onClick={() => navigate("/game")}>Back to Game</button>
    <div className="admin">
      <div className="admin-scrollable-container" id="sight-edit-container">
        <h2>Sight Words</h2>
        <div className="admin-header">
          <textarea
            placeholder="Enter words line by line"
            value={newSightInput}
            onChange={(e) => setNewSightInput(e.target.value)}
            id="sight-input"
            key="sight-input"
          />
          <button onClick={() => handleAddWords("sight-words", "default")}>
            Add New Sight Words
          </button>
        </div>
        <ul className="admin-ul">
          {sightWords.map((word, index) => (
            <li key={index} className="admin-li">
              <span
                className={selectedWord === word.word ? "selected-word" : ""}
                onClick={() => handleSelectWord(word.word)}
              >
                {word.word}
              </span>
              <button onClick={() => handleDeleteWord("sight-words", index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-scrollable-container" id="noun-edit-container">
        <h2>Nouns</h2>
        <div className="admin-header">
          <textarea
            placeholder="Enter words line by line"
            value={newNounsInput}
            onChange={(e) => setNewNounsInput(e.target.value)}
            id="noun-input"
            key="noun-input"
          />
          <button onClick={() => handleAddWords("nouns", "default")}>
            Add New Nouns
          </button>
        </div>
        <ul className="admin-ul">
          {nouns.map((word, index) => (
            <li key={index} className="admin-li">
              <span
                className={selectedWord === word.word ? "selected-word" : ""}
                onClick={() => handleSelectWord(word.word)}
              >
                {word.word}
              </span>
              <button onClick={() => handleDeleteWord("nouns", index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Admin;

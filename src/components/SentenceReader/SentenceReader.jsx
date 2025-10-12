import { useState, useEffect } from "react";
import "./sentencereader.css";

function SentenceReader({ sentence }) {
  const [isSentenceOpen, setIsSentenceOpen] = useState(false);
  const [displayedSentence, setDisplayedSentence] = useState(""); // store sentence for popup

  const openSentencePopup = () => {
    const formattedSentence = formatAndSaveSentence();
    setDisplayedSentence(formattedSentence);
    setIsSentenceOpen(true);
  };

  const closeSentencePopup = () => setIsSentenceOpen(false);

  const formatAndSaveSentence = () => {
    const formattedSentence = [];

    sentence.forEach((word, index) => {
      if (index === 0) {
        formattedSentence.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else if ([".", "?", "!"].includes(word.slice(-1))) {
        formattedSentence.push(word);
      } else {
        formattedSentence.push(" " + word);
      }
    });

    const finalSentence = formattedSentence.join("");

    // Copy to clipboard
    navigator.clipboard.writeText(finalSentence)
      .then(() => console.log("Text copied to clipboard"))
      .catch(err => console.error("Failed to copy text: ", err));

    // Save to localStorage as a list of sentences
    const existingSentences = JSON.parse(localStorage.getItem("savedSentences") || "[]");
    existingSentences.push(finalSentence);
    localStorage.setItem("savedSentences", JSON.stringify(existingSentences));

    return finalSentence;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(!sentence || sentence.length === 0);
  }, [sentence]);

  return (
    <div>
      <button
        className={`button ${isButtonDisabled ? "disabled" : "enabled"}`}
        id="sentencereader"
        onClick={openSentencePopup}
        disabled={isButtonDisabled}
      >
        Read
      </button>
      {isSentenceOpen && (
        <div className="confirm-popup">
          <p>{displayedSentence}</p>
          <button onClick={closeSentencePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default SentenceReader;

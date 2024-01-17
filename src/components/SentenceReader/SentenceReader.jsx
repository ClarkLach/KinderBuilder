import { useState, useEffect } from "react";
import "./sentencereader.css";

function SentenceReader({ sentence }) {
  const [isSentenceOpen, setIsSentenceOpen] = useState(false);

  const openSentencePopup = () => {
    setIsSentenceOpen(true);
  };

  const closeSentencePopup = () => {
    setIsSentenceOpen(false);
  };

  function ReadSentence() {
    const user = localStorage.getItem("userName");
    const formattedSentence = [];

    sentence.forEach((word, index) => {
      if (index === 0) {
        formattedSentence.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else if ([".", "?", "!"].includes(word.slice(-1))) {
        // If the current word ends with ".", "?", or "!", concatenate it without space
        formattedSentence.push(word);
      } else {
        formattedSentence.push(" " + word);
      }
    });

    return user + ":\n\n" + formattedSentence.join("");
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    checkForSentence(sentence);
  }, [sentence]);

  const checkForSentence = (sentence) => {
    if (sentence && sentence.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  return (
    <div>
      <button
        className={`button ${isButtonDisabled ? "disabled" : "enabled"}`}
        id="sentencereader"
        onClick={openSentencePopup}
        disabled={isButtonDisabled}
      >
        Read sentence
      </button>
      {isSentenceOpen && (
        <div className="confirm-popup">
          <p>{ReadSentence()}</p>
          <button onClick={closeSentencePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default SentenceReader;

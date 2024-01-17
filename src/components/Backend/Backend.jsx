import React, { useState, useEffect } from "react";

const Backend = ({ sentence }) => {
  const name = localStorage.getItem("userName");
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

  const finalString = formattedSentence.join("");
  console.log("finalString: " + finalString);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirmPopup = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmOpen(false);
  };

  const handleSaveData = async () => {
  const apiUrl = "http://kinderbuilder.org/api/users";

  closeConfirmPopup();

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, sentence: finalString }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Data saved successfully:", data);
      alert("Sentence submitted successfully!");
    } else {
      console.error("Failed to save data");
      alert("Failed to submit sentence. Error: " + error);
    }
  } catch (error) {
    console.error("Error during data save:", error);
    alert("Failed to submit sentence. Error: " + error);
  }
};

// Same logic as SentenceReader, disables button if no sentence
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
        id="submit"
        onClick={openConfirmPopup}
        disabled={isButtonDisabled}
      >
        Submit Sentence
      </button>
      {isConfirmOpen && (
        <div className="confirm-popup">
          <p>Are you sure you want to submit?</p>
          <button onClick={handleSaveData}>Yes</button>
          <button onClick={closeConfirmPopup}>No</button>
        </div>
      )}
    </div>
  );
};

export default Backend;

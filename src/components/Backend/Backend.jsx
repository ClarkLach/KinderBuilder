import React, { useState } from "react";

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

  const handleSaveData = async () => {
    const apiUrl = "http://192.168.0.100:3001/api/users";

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
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error during data save:", error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleSaveData}>
        Save Data
      </button>
    </div>
  );
};

export default Backend;

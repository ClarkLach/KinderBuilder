import React, { useRef, useEffect } from "react";
import "./sentencetext.css";

function SentenceText({ sentence, onWordClick }) {
  const sentenceTextRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when the sentence changes
    sentenceTextRef.current.scrollTop = sentenceTextRef.current.scrollHeight;
  }, [sentence]);

  return (
    <div className="sentence-text" ref={sentenceTextRef}>
      {sentence.map((item, index) => (
        <div
          key={item + Math.random()}
          className="word in-sentence"
          onClick={() => onWordClick(item, index)}
        >
          {index === 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item}
        </div>
      ))}
    </div>
  );
}

export default SentenceText;

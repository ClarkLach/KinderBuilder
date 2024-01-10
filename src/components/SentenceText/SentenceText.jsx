import "./sentencetext.css";

function SentenceText({ sentence, onWordClick }) {
  return (
    <div className="sentence-text">
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

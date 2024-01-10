import "./Puncuation.css";

function Puncuation({onWordClick}) {
  const puncuation = [".", "?", "!"];

  return (
    <div className="puncuation-container">
      {puncuation.map((item) => (
        <div key={item} className="word" onClick={() => onWordClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default Puncuation;

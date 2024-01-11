export const nouns = [
  "acorn",
  "apple",
  "ball",
  "butterfly",
  "cat",
  "cloud",
  "dolphin",
  "dog",
  "elephant",
  "fish",
  "flower",
  "guitar",
  "giraffe",
  "hat",
  "house",
  "ice cream",
  "igloo",
  "jellyfish",
  "juice",
  "key",
  "kite",
  "lamp",
  "lion",
  "moon",
  "mountain",
  "nest",
  "notebook",
  "ocean",
  "octopus",
  "penguin",
  "queen",
  "rainbow",
  "sun",
  "turtle",
  "umbrella",
  "van",
  "watermelon",
  "xylophone",
  "yo-yo",
  "zebra",
];

const Nouns = ({ onWordClick }) => {
  return (
    <div className="nouns">
      <div className="title">Nouns</div>
      <div className="wordcontainer">
        {nouns.map((item) => (
          <div key={item} className="word" onClick={() => onWordClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nouns;

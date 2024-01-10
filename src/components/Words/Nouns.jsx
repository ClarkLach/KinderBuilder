import "./words.css";

export const nouns = [
    "acorn", "apple", "ball", "butterfly",
    "cat", "cloud", "dolphin", "dog",
    "elephant", "fish", "flower", "guitar",
    "giraffe", "hat", "house", "ice cream",
    "igloo", "jellyfish", "juice", "key",
    "kite", "lamp", "lion", "moon",
    "mountain", "nest", "notebook", "ocean",
    "octopus", "penguin", "queen", "rainbow",
    "sun", "turtle", "umbrella", "van",
    "watermelon", "xylophone", "yo-yo", "zebra"
];

function NounClick() {
    console.log("Noun clicked");
}

const Nouns = ({onWordClick}) => {
    return (
        <div className="nouns">
            <div className="title">Nouns</div>
            {nouns.map((item) => (
                <div key={item} className="word" onClick={() => onWordClick(item)}>{item}</div>
            ))}
        </div>
    )
}

export default Nouns;
import "./words.css";

export const sight_words = [
    "all", "am", "an", "and", "are", "as", "at", "ate", "be", "big",
    "black", "brown", "but", "can", "came", "come", "could", "did", "do", "down",
    "eat", "for", "four", "from", "get", "go", "good", "have", "he", "here",
    "how", "I", "in", "into", "is", "it", "know", "like", "little", "look",
    "make", "me", "more", "must", "my", "new", "no", "not", "now", "of",
    "on", "one", "or", "other", "our", "out", "over", "play", "please", "pretty",
    "ran", "ride", "said", "saw", "say", "see", "she", "so", "some", "soon",
    "that", "the", "their", "there", "these", "they", "this", "time", "to", "too",
    "two", "under", "up", "want", "was", "we", "went", "were", "what", "when",
    "where", "white", "who", "will", "with", "yes", "you", "your"
];

function SightWords({onWordClick}) {
    return (
        <div className="sightwords">
            <div className="title">Sight Words</div>
            {sight_words.map((item) => (
                <div key={item} className="word" onClick={() => onWordClick(item)}>{item}</div>
            ))}
        </div>
    )
}

export default SightWords;
import "./sentencereader.css";

function SentenceReader({ sentence }) {
  function ReadSentence() {
    const user = localStorage.getItem("userName");
    const formattedSentence = [];

    sentence.forEach((word, index) => {
      if (index === 0) {
        formattedSentence.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else if (['.', '?', '!'].includes(word.slice(-1))) {
        // If the current word ends with ".", "?", or "!", concatenate it without space
        formattedSentence.push(word);
      } else {
        formattedSentence.push(" " + word);
      }
    });
  
    alert(user + ":\n\n" + formattedSentence.join(""));
  }

  return (
    <button className="button" id="sentencereader" onClick={ReadSentence}>
      Read sentence
    </button>
  );
}

export default SentenceReader;

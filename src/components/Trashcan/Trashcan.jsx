import "./trashcan.css";
import trashcan from "../../assets/trashcan.png";

function Trashcan({clearSentence}) {
  return (
    <>
      <img src={trashcan} className="trashcan" onClick={clearSentence}></img>
    </>
  );
}

export default Trashcan;

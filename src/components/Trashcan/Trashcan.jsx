import React, { useState } from "react";
import "./trashcan.css";
import trashcan from "../../assets/trashcan.png";

function Trashcan({ clearSentence, popupString, useLocalStyles = true }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirmPopup = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmOpen(false);
  };

  const handleDelete = () => {
    clearSentence(); // Call the delete function
    closeConfirmPopup(); // Close the confirmation popup
  };

  return (
    <>
      <img src={trashcan} className="trashcan" onClick={openConfirmPopup} alt="Delete" />
      
      {isConfirmOpen && (
        <div className="confirm-popup">
          <p>{popupString}</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={closeConfirmPopup}>No</button>
        </div>
      )}
    </>
  );
}

export default Trashcan;

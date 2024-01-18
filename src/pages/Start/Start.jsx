import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";

const Start = () => {
  const [userName, setUserName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const checkForName = (name) => {
    if (name.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setUserName(newName);
    checkForName(newName);
  };

  // Click button action
  const handlePlayClick = () => {
    if (!isButtonDisabled) {
      localStorage.setItem("userName", userName);
      navigate("/game");
    }
  };

  // Lets you press enter to submit as well
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && userName.length > 0) {
      handlePlayClick();
    }
  };

  return (
    <div className="startcontainer">
      <h1 className="starttitle">Kinder Builder</h1>
      <input
        type="text"
        id="name"
        className="name"
        placeholder="Type your name"
        value={userName}
        onChange={handleNameChange}
        onKeyUp={handleKeyPress}
      />
      <button
        className={`button ${isButtonDisabled ? "disabled" : "enabled"}`}
        id="play"
        onClick={handlePlayClick}
        disabled={isButtonDisabled}
      >
        Play!
      </button>

      <button className="adminbutton" id="admin" onClick={() => navigate("/admin")}>
        Admin
      </button>
    </div>
  );
};

export default Start;

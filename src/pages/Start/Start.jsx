import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";

const Start = () => {
  const [userName, setUserName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for name when the page loads
    checkForName(userName);
  }, [userName]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setUserName(newName);
    checkForName(newName);
  };

  const handlePlayClick = () => {
    if (!isButtonDisabled) {
      localStorage.setItem("userName", userName);
      // Navigate to "/game"
      navigate("/game");
    }
  };

  const checkForName = (name) => {
    if (name.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

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
        Play
      </button>
    </div>
  );
};

export default Start;

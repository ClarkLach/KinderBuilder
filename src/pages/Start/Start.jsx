import { useNavigate } from "react-router-dom";
import "./Start.css";

const Start = () => {
  const navigate = useNavigate()
  // Click button action
  const handlePlayClick = () => {
      navigate("/game");
    }

  return (
    <div className="startcontainer">
      <h1 className="starttitle">Kinder Builder</h1>
      <button
        className={"button enabled"}
        id="play"
        onClick={handlePlayClick}
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

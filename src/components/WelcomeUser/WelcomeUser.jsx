import "./welcomeuser.css";

function WelcomeUser() {
  const name = localStorage.getItem("userName");
  return <h1 className="welcome-user">Welcome, {name}!</h1>;
}

export default WelcomeUser;
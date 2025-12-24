import React from 'react';
 import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGuestJoin = () => {
    const randomRoomId = Math.random().toString(36).substring(2, 9);
    navigate(`/meeting/${randomRoomId}`);
  };

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2> PaperTalk

</h2>
        </div>
        <div className='navlist'>
          <p onClick={handleGuestJoin}>Join as Guest</p>
          <p onClick={() => navigate("/auth")}>Register</p>
          <div onClick={() => navigate("/auth")} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect Instantly.</span> Talk Freely.
          </h1>
          <p>Bring your loved ones closer, no matter how far.</p>
          <div role='button'>
            <Link to={"/auth"}>Start Your Call</Link>
          </div>
        </div>
        <div>
          <img src="/mobile.png" alt="Video Call App Preview" />
        </div>
      </div>
    </div>
  );
}

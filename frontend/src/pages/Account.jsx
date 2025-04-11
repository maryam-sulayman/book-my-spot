import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import "../styles/Account.css";
import Button from "../components/Button";
import profileImage from "../images/profile.png";
import Bookings from "../pages/Bookings";
import ListSpot from "../pages/ListSpot";
import Messages from "../pages/Messages"; 

import axios from "axios";

export default function Account() {
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activePage, setActivePage] = React.useState("profile"); // Manage active page state

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:4000/auth/sign-out", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Failed to sign out:", err.response?.data || err.message);
    }
  };

  if (!ready) return "Loading...";
  if (ready && !user) return <Navigate to={"/sign-in"} />;

  const renderActivePage = () => {
    switch (activePage) {
      case "profile":
        return (
          <div className="profile-page">
            <div className="left-section">
              <img src={profileImage} alt="Profile" className="profile-picture" />
              <h3>{user?.name?.toUpperCase()}</h3>
              <button className="update-button">Update profile picture</button>
            </div>
            <div className="right-section">
              <p className="warning-text">
                To make changes to your profile, contact support at +44 782309583 or
                support@bookmyspot.co.uk.
              </p>
              <div className="info-background">
                <div className="info-field">
                  <label className="info-label">Name:</label>
                  <span className="info-value">{user?.name || "N/A"}</span>
                </div>
                <div className="info-field">
                  <label className="info-label">Phone:</label>
                  <span className="info-value">{user?.phone || "N/A"}</span>
                </div>
                <div className="info-field">
                  <label className="info-label">Email:</label>
                  <span className="info-value">{user?.email || "N/A"}</span>
                </div>
                <div className="info-field">
                  <label className="info-label">Role:</label>
                  <span className="info-value">{user?.role || "N/A"}</span>
                </div>
              </div>
              <Button customClass="sign-out" handleClick={handleSignOut} title="Sign out" />
            </div>
          </div>
        );
      case "bookings":
        return <Bookings userRole={user.role} />;
      case "list":
        return <ListSpot userRole={user.role} />;
        case "messages":
          return <Messages userId={user.id} />; 
      default:
        return null;
    }
  };

  return (
    <div className="account-page">
      <nav className="link-container">
        <button
          onClick={() => setActivePage("profile")}
          className={activePage === "profile" ? "active-link" : "link"}
        >
          My Profile
        </button>
        <button
          onClick={() => setActivePage("bookings")}
          className={activePage === "bookings" ? "active-link" : "link"}
        >
          My Bookings
        </button>
        {user.role === "owner" && (
          <button
            onClick={() => setActivePage("list")}
            className={activePage === "list" ? "active-link" : "link"}
          >
            List a Spot
          </button>
        )}
             <button
          onClick={() => setActivePage("messages")}
          className={activePage === "messages" ? "active-link" : "link"}
        >
          My Messages
        </button>
      </nav>
      {renderActivePage()}
    </div>
  );
}

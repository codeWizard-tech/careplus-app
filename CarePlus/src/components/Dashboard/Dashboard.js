import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import MedicalDetails from "../MedicalDetails/MedicalDetails";
import Reminders from "../Reminders/Reminders";
import Motivation from "../Motivation/Motivation";

function Dashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("medical");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "medical":
        return <MedicalDetails />;

      case "reminders":
        return <Reminders />;

      case "notifications":
        return <Motivation />;

      case "emergency":
        return (
          <div className="tab-content-box">
            <h3>Emergency Contacts</h3>
            <p>• Dad: +91 XXXXXXX</p>
            <p>• Doctor: +91 XXXXXXX</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="logo-text">CarePlus</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div
          className={activeTab === "medical" ? "tab active" : "tab"}
          onClick={() => setActiveTab("medical")}
        >
          Medical Details
        </div>

        <div
          className={activeTab === "reminders" ? "tab active" : "tab"}
          onClick={() => setActiveTab("reminders")}
        >
          Reminders
        </div>

        <div
          className={activeTab === "notifications" ? "tab active" : "tab"}
          onClick={() => setActiveTab("notifications")}
        >
          Motivation Notifications
        </div>

        <div
          className={activeTab === "emergency" ? "tab active" : "tab"}
          onClick={() => setActiveTab("emergency")}
        >
          Emergency Contacts
        </div>
      </div>

      {/* Content Section */}
      <div className="content-area">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;

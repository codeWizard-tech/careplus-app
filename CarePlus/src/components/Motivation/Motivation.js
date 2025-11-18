import React, { useState, useEffect } from "react";

function Motivation() {
  const [motMessage, setMotMessage] = useState("");

  const fetchMotivation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/notifications");
      const data = await response.json();
      setMotMessage(data.message);
    } catch (error) {
      setMotMessage("Unable to fetch motivation right now.");
    }
  };

  useEffect(() => {
    fetchMotivation();
    const interval = setInterval(fetchMotivation, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tab-content-box">
      <h3>Motivation Boost</h3>
      <p>{motMessage}</p>
    </div>
  );
}

export default Motivation;

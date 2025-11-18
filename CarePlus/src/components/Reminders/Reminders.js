import React, { useState, useEffect } from "react";

function Reminders() {
  const [reminderMessage, setReminderMessage] = useState("");

  const fetchReminder = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/reminders");
      const data = await response.json();
      setReminderMessage(data.message);
    } catch (error) {
      setReminderMessage("Unable to fetch reminders right now.");
    }
  };

  useEffect(() => {
    fetchReminder();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchReminder, 30000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="tab-content-box">
      <h3>Your Reminder</h3>
      <p>{reminderMessage}</p>
    </div>
  );
}

export default Reminders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from React Router
import { FaArrowLeft } from "react-icons/fa"; // Importing back arrow icon from react-icons

const ViewSlot = () => {
  const [doctorName, setDoctorName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [noSlotsMessage, setNoSlotsMessage] = useState(""); // New state for message
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch doctor names from DB on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data); // Assuming response is an array of doctor names
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const fetchSlots = async () => {
    if (!doctorName || !selectedDate) {
      alert("Please select a doctor and date.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:5000/api/availability", {
        params: { doctorName, date: selectedDate },
      });
  
      if (response.data.availableSlots.length > 0) {
        setSlots(response.data.availableSlots);
        setNoSlotsMessage(""); // Clear the message when slots are available
      } else {
        setSlots([]);
        setNoSlotsMessage(response.data.message || "No slots available for the selected doctor and date."); // Use message from API response
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      setNoSlotsMessage("Error fetching slots. Please try again later."); // Error message
    }
  };

  return (
    <div className="container">
      {/* Internal CSS for styling */}
      <style>
        {`
          .dashboard-title {
            font-size: 2rem; 
            font-weight: bold;
            color: #2c3e50; 
            text-align: center;
            margin-top: 20px; 
            font-family: 'Arial', sans-serif; 
            text-transform: uppercase; 
            letter-spacing: 1.5px; 
          }

          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 400px; 
            margin: 50px auto; 
            padding: 20px;
            background: #ffffff;
            border-radius: 10px;
            border: 1px solid black;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }

          .input-group {
            margin-bottom: 15px;
          }

          .input-label {
            display: block;
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 8px;
            color: #4a4a4a;
            margin-right: 15px;
          }

          .input-field {
            font-size: 1rem;
            border: 1px solid grey;
          }

          .time-slot-heading {
            font-size: 2rem; 
            font-weight: bold;
            color: #2c3e50; 
            text-align: center;
            margin-bottom: 20px; 
            font-family: 'Arial', sans-serif; 
            text-transform: uppercase; 
            letter-spacing: 1.5px; 
          }

          .slot-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center; 
            gap: 10px; 
          }

          .slot-card {
            flex: 1 1 calc(33.33% - 20px); 
            max-width: 250px;
            margin: 10px;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .slot-card.available {
            background: #45c4b5; 
            color: rgb(242, 242, 242); 
          }

          .button-container {
            display: flex;
            justify-content: center;
            gap: 10px; 
          }

          .view-btn {
            width: auto;
            background-color: #48f0dc;
            font-size: 14px;
            padding: 6px 12px;
          }

          .view-btn:hover {
            background-color: #45c4b5;
            border-color: #45c4b5;
          }

          .no-slots-message {
            text-align: center;
            font-size: 1.2rem;
            color: #d9534f; 
            margin-top: 20px;
          }

          .back-btn {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 1.2rem;
            margin-top: 20px;
          }

          .back-btn span {
            margin-left: 10px;
          }
        `}
      </style>

      {/* Back Button with Icon */}
      <div className="back-btn" onClick={() => navigate("/availability")}>
        <FaArrowLeft /> {/* React Icons back arrow */}
        <span>Back to Availability</span>
      </div>

      <h2 className="dashboard-title">View Available Slots</h2>

      <div className="form">
        <div className="input-group">
          <label className="input-label">Select Doctor:</label>
          <select
            className="input-field"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc, index) => (
              <option key={index} value={doc.name}>{doc.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Select Date:</label>
          <input
            type="date"
            className="input-field"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <button className="btn view-btn" onClick={fetchSlots}>
          View Slots
        </button>
      </div>

      {noSlotsMessage && <p className="no-slots-message">{noSlotsMessage}</p>} {/* Display message */}

      {slots.length > 0 && (
        <div className="time-slots">
          <h3 className="time-slot-heading">Available Slots</h3>
          <div className="slot-container">
            {slots.map((slot, index) => (
              <div key={index} className="slot-card available">
                {slot}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSlot;

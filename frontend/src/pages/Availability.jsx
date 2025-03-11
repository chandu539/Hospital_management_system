import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

const Availability = () => {
  const [doctorName, setDoctorName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("5:00 PM");
  const [timeSlots, setTimeSlots] = useState([]);
  const [availability, setAvailability] = useState({});
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const fetchDoctorList = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        if (Array.isArray(data)) {
          setDoctorList(data);
        } else {
          console.error("Invalid doctor list format:", data);
        }
      } catch (error) {
        console.error("Error fetching doctor list:", error);
      }
    };
    fetchDoctorList();
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    // Generate AM times first, then PM times
    for (let hour = 1; hour <= 12; hour++) {
      ["00", "30"].forEach((minute) => {
        times.push(`${hour}:${minute} AM`);
      });
    }
    for (let hour = 1; hour <= 12; hour++) {
      ["00", "30"].forEach((minute) => {
        times.push(`${hour}:${minute} PM`);
      });
    }
    return times;
  };

  const convertTo24HourFormat = (time) => {
    let [hour, minute, period] = time.split(/[: ]/);
    hour = parseInt(hour);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return new Date(2023, 0, 1, hour, minute);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${period}`;
  };

  const generateTimeSlots = () => {
    if (!doctorName || !selectedDate || !startTime || !endTime) {
      alert("Please select a doctor, date, and working hours.");
      return;
    }

    const start = convertTo24HourFormat(startTime);
    const end = convertTo24HourFormat(endTime);

    // Ensure the end time is after the start time
    if (start >= end) {
      alert("End time must be greater than start time.");
      return;
    }

    const slotTimes = [];
    while (start < end) {
      let nextSlot = new Date(start.getTime() + 30 * 60000);
      slotTimes.push({
        time: formatTime(start) + " - " + formatTime(nextSlot),
        available: false,
      });
      start.setMinutes(start.getMinutes() + 30);
    }

    setTimeSlots(slotTimes);
    setAvailability({});
  };

  const toggleAvailability = (slot) => {
    setAvailability((prev) => ({
      ...prev,
      [slot]: !prev[slot],
    }));
  };

  const saveAvailability = async () => {
    if (!doctorName || !selectedDate) {
      alert("Please select a doctor and date.");
      return;
    }

    const schedule = {
      doctorName,
      date: selectedDate,
      availability: timeSlots.map((slot) => ({
        time: slot.time,
        available: availability[slot.time] || false,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.error || "Failed to save availability.");
        return;
      }

      alert(result.message || "Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("An error occurred while saving availability.");
    }
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .dashboard-title {
            color:rgb(0, 0, 0);
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .input-group {
            margin-bottom: 15px;
          }
          .input-label {
            font-weight: bold;
            margin-right: 10px;
          }
          .slot-card {
            display: inline-block;
            width: 100%;
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
            background: #45c4b5; /* Teal */
            color:rgb(242, 242, 242); /* Dark Green */
          }
          .slot-card.unavailable {
            background: #f8d7da;
            color: #721c24;
          }
          .status {
            font-size: 14px;
            font-weight: bold;
          }
          .generate-btn, .save-btn {
            width: 100%;
            margin-top: 10px;
            font-size: 16px;
            padding: 10px;
            background-color: #45c4b5; /* Teal */
            border-color: #45c4b5; /* Teal */
            color: #fff;
          }

        



          .generate-btn:hover, .save-btn:hover {
            background-color: #48f0dc; /* Turquoise */
            border-color: #48f0dc; /* Turquoise */
          }
          .time-slots {
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          /* Custom Styling to Reduce Input Field Size */
          .form-control-sm {
            font-size: 0.9rem;
            padding: 0.375rem 0.75rem;
          }
        `}
      </style>

      <h2 className="dashboard-title">Doctor Availability Status</h2>

      {/* Doctor Dropdown */}
      <div className="input-group">
        <label className="input-label">Doctor Name:</label>
        <select
          className="form-control-md"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctorList.map((doctor) => (
            <option key={doctor._id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Date */}
      <div className="input-group">
        <label className="input-label">Select Date:</label>
        <input
          className="form-control-md"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Select Working Hours */}
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <label className="input-label">Start Time:</label>
            <select
              className="form-control-md"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <label className="input-label">End Time:</label>
            <select
              className="form-control-md"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className="btn btn-md generate-btn" onClick={generateTimeSlots}>
        Generate Time Slots
      </button>

      {timeSlots.length > 0 && (
        <div className="time-slots">
          <h3>
            Time Slots for {doctorName} on {selectedDate}
          </h3>
          <div className="d-flex flex-wrap justify-content-start">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`slot-card ${
                  availability[slot.time] ? "available" : "unavailable"
                }`}
                onClick={() => toggleAvailability(slot.time)}
              >
                <span>{slot.time}</span>
                <div className="status">
                  {availability[slot.time] ? "Available" : "Unavailable"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn-md save-btn" onClick={saveAvailability}>
        Save Availability
      </button>
    </div>
  );
};

export default Availability;

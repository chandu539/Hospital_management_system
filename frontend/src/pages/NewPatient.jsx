import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/NewPatient.css";

const NewPatient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    contact: "",
    address: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patients/add", patient);
      alert("Patient added successfully!");
      navigate("/patientlist"); // Redirect to patient list after adding
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={patient.name} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={patient.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} required />

        <label>Contact:</label>
        <input type="text" name="contact" value={patient.contact} onChange={handleChange} />

        <label>Address:</label>
        <input type="text" name="address" value={patient.address} onChange={handleChange} />

        <label>Blood Group:</label>
        <input type="text" name="bloodGroup" value={patient.bloodGroup} onChange={handleChange} />


        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default NewPatient;

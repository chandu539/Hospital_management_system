import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Patient.css";

const Patients = () => {
  const navigate = useNavigate();

  return (
    <div className="patient-nav-container">
      <button onClick={() => navigate("/patientlist")} className="patient-btn">Patient List</button>
      <button onClick={() => navigate("/newpatient")} className="patient-btn">add new patient</button>
    </div>
  );
};

export default Patients;

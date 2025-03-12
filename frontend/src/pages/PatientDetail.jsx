import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PatientDetail.css"; 

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/patients/${id}`)
      .then((response) => setPatient(response.data))
      .catch((error) => console.error("Error fetching patient:", error));
  }, [id]);

  if (!patient) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="patient-detail-card">
      <h2>{patient.name}</h2>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
      <p><strong>Contact:</strong> {patient.contact || "N/A"}</p>
      <p><strong>Address:</strong> {patient.address || "N/A"}</p>
      <p><strong>Blood Group:</strong> {patient.bloodGroup || "N/A"}</p>
      <p><strong>Medical History:</strong> {patient.medicalHistory || "N/A"}</p>
      <button
                  
                  onClick={(e) => {
                    
                    navigate('/prescription');
                  }}
                >
                  Add Prescription
                </button>
    </div>
  );
  
};

export default PatientDetail;
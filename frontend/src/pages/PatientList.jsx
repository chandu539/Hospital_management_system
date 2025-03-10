import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PatientList.css"; 



const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/patients").then((response) => {
      setPatients(response.data);
    });
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patient-container">
      <h2>Patient List</h2>
      <input
        type="text"
        placeholder="🔍 Search..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient._id} onClick={() => navigate(`/patients/${patient._id}`)}>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.dateOfBirth}</td>
              <td>
              <button
                  className="medical-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click from triggering
                    navigate(`/medicalrecords/${patient._id}`);
                  }}
                >
                  Medical Records
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
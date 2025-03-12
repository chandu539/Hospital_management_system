import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  // Internal CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f8f9fa",
      padding: "20px",
    },
    title: {
      color: "#007bff",
      marginBottom: "20px",
    },
    searchBar: {
      width: "50%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    table: {
      width: "80%",
      maxWidth: "900px",
      borderCollapse: "collapse",
      background: "white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      overflow: "hidden",
    },
    thTd: {
      padding: "12px",
      textAlign: "center",
      borderBottom: "1px solid #ddd",
    },
    th: {
      backgroundColor: "#007bff",
      color: "white",
    },
    rowHover: {
      cursor: "pointer",
    },
    button: {
      backgroundColor: "#48f0dc",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "0.3s",
    },
    buttonHover: {
      backgroundColor: "#40d9c7",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Patient List</h2>
      <input
        type="text"
        placeholder="🔍 Search..."
        style={styles.searchBar}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Gender</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Date of Birth</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr
              key={patient._id}
              style={styles.rowHover}
              onClick={() => navigate(`/patients/${patient._id}`)}
            >
              <td style={styles.thTd}>{patient.name}</td>
              <td style={styles.thTd}>{patient.gender}</td>
              <td style={styles.thTd}>{patient.dateOfBirth}</td>
              <td style={styles.thTd}>
                <button
                  style={styles.button}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
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

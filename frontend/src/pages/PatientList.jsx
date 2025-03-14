import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch patients");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Patient List</h2>
        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && !error && patients.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>Date of Birth</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Blood Group</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} style={styles.row}>
                  <td style={styles.td} >{patient.name}</td>
                  <td style={styles.td}>{patient.gender}</td>
                  <td style={styles.td}>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                  <td style={styles.td}>{patient.contact}</td>
                  <td style={styles.td}>{patient.address}</td>
                  <td style={styles.td}>{patient.bloodGroup}</td>
                  <td style={styles.td}>
                    <button style={styles.button} onClick={() => navigate('/prescription')}>Add Prescription</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noRecords}>No patient records found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "#f8f9fa",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "1100px",
    width: "100%",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    background: "#48f0dc",
    color: "#333",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  row: {
    transition: "background 0.3s",
  },
  rowHover: {
    background: "#e6f9f6",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
  button: {
    background: "#10B981",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "14px",
  },
  buttonHover: {
    background: "#059669",
  },
  loading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: "18px",
  },
  noRecords: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
};

export default PatientList;
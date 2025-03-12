import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors/get/prescriptions");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching prescription records", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f8f9fa",
      overflow: "auto",
      padding: "20px",
    },
    card: {
      width: "80%",
      maxWidth: "900px",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      background: "#48f0dc",
      color: "white",
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
    },
    title: {
      textAlign: "center",
      color: "black",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Medical Records</h2>
        {records.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Patient Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Diagnosis</th>
                <th style={styles.th}>Medicines</th>
                <th style={styles.th}>Surgeries</th>
                <th style={styles.th}>Follow-Up Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td style={styles.td}>{record.date}</td>
                  <td style={styles.td}>{record.patientName}</td>
                  <td style={styles.td}>{record.age}</td>
                  <td style={styles.td}>{record.diagnosis}</td>
                  <td style={styles.td}>
                    {record.medicines.map((med, i) => (
                      <div key={i}>
                        {med.name} ({med.dosage}, {med.frequency}, {med.duration})
                      </div>
                    ))}
                  </td>
                  <td style={styles.td}>{record.surgeries || "None"}</td>
                  <td style={styles.td}>{record.followUp.nextDate || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>No medical records found.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;

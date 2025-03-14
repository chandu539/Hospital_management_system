import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
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
        <h2 style={styles.title}>Appointments List</h2>
        {loading && <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>}
        {!loading && !error && appointments.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>Department</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td style={styles.td}>{appointment.firstName} {appointment.lastName}</td>
                  <td style={styles.td}>{appointment.mobile}</td>
                  <td style={styles.td}>{appointment.email}</td>
                  <td style={styles.td}>{appointment.date}</td>
                  <td style={styles.td}>{appointment.time}</td>
                  <td style={styles.td}>{appointment.doctor}</td>
                  <td style={styles.td}>{appointment.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
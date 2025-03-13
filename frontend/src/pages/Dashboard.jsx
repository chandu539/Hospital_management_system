import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Hospitalized Patients",
        data: [120, 150, 130, 180, 160, 200],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
      {
        label: "Outpatients",
        data: [100, 130, 98, 140, 150, 170],
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
      },
    ],
  };

  return (
    <Container fluid style={styles.container}>
      <Row className="mb-4" style={styles.headerRow}>
        <Col md={6}>
          <h4 style={styles.greeting}>Good Morning Dr. Robert!</h4>
        </Col>
        <Col md={6}>
          <h4 style={styles.heading}>Dashboard</h4>
        </Col>
      </Row>
      
      {/* Stats Cards */}
      <Row>
        {[
          { title: "Total Patients", value: "579", change: "+15%" },
          { title: "Total Appointments", value: "54", change: "+10%" },
          { title: "Total Income", value: "$8,399.24", change: "+28%" },
          { title: "Total Treatments", value: "112", change: "+12%" },
        ].map((item, idx) => (
          <Col key={idx} md={3}>
            <Card style={styles.statCard}>
              <h6>{item.title}</h6>
              <h4>{item.value}</h4>
              <span style={styles.greenText}>{item.change}</span>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Overview & Appointments */}
      <Row className="mt-4">
        <Col md={8}>
          <Card style={styles.card}>
            <h5>Overview</h5>
            <Line data={chartData} />
          </Card>
        </Col>
        <Col md={4}>
          <Card style={styles.card}>
            <h5>Appointment List</h5>
            <Table borderless>
              <tbody>
                {[
                  { name: "Shailendra Gautam", type: "Allergy Testing", time: "10:30 AM" },
                  { name: "Henry", type: "Blood Testing", time: "11:30 AM" },
                  { name: "Chandu", type: "Typhoid Testing", time: "12:30 PM" },
                  { name: "Hary Brook", type: "X-ray Testing", time: "1:30 PM" },
                  { name: "Brooklyn Simmons", type: "CBC Testing", time: "2:30 PM" },
                  { name: "Courtney Henry", type: "Lab Test", time: "3:00 PM" },
                  { name: "Sarah Miller", type: "Chronic Care", time: "4:00 PM" },
                ].map((appt, idx) => (
                  <tr key={idx} style={styles.tableRow}>
                    <td>{appt.name}</td>
                    <td>{appt.type}</td>
                    <td>{appt.time}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Patient List */}
      <Row className="mt-4">
        <Col>
          <Card style={styles.card}>
            <h5>Patient List</h5>
            <Table striped bordered>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Brooklyn Simmons", gender: "Male", age: "29", dept: "Cardiology" },
                  { name: "Anthony Johnson", gender: "Male", age: "27", dept: "Neurology" },
                  { name: "Sarah Miller", gender: "Female", age: "35", dept: "Oncology" },
                ].map((patient, idx) => (
                  <tr key={idx} style={styles.tableRow}>
                    <td>{patient.name}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.age}</td>
                    <td>{patient.dept}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};  

// Internal CSS Styles
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    minHeight: "100vh",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "right",
  },
  statCard: {
    padding: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  greenText: {
    color: "green",
    fontWeight: "bold",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#f1f1f1",
    fontWeight: "bold",
  },
  tableRow: {
    transition: "background 0.3s",
  },
};

export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import "../styles/Medical_record.css";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/medical/")
      .then(response => setRecords(response.data))
      .catch(error => console.error("Error fetching records", error));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 heading">📜 Medical History</h2>
      <Row>
        {records.map(record => (
          <Col md={6} lg={4} key={record._id} className="mb-4 fade-in">
            <Card className="shadow-lg border-0 medical-card" onClick={() => toggleExpand(record._id)}>
              <Card.Body>
                <Card.Title className="text-primary">{record.patientName}</Card.Title>
                {expandedId === record._id && (
                  <div>
                    <Card.Text><strong>Age:</strong> {record.age} years</Card.Text>
                    <Card.Text><strong>Diagnosis:</strong> {record.diagnosis}</Card.Text>
                    <Card.Text><strong>Prescriptions:</strong></Card.Text>
                    <ul>
                      {record.prescriptions.map((pres, index) => (
                        <li key={index}>{pres.medicine} - {pres.dosage}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MedicalRecords;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Button } from "react-bootstrap";
import Sidebar from "./Sidebar"; // Import Sidebar
import "./AppointmentsPage.css";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredAppointments = appointments.filter(
    (appt) =>
      (filter === "All" || appt.status === filter) &&
      (search === "" ||
        appt.patient.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="appointments-container">
      <Sidebar />
      <Container className="appointments-content">
        <div className="header">
          <h2> Appointments List </h2>{" "}
          <div className="actions d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
            <Form.Select
              className="filter-dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All"> All </option>{" "}
              <option value="Scheduled"> Scheduled </option>{" "}
              <option value="Pending"> Pending </option>{" "}
              <option value="Canceled"> Canceled </option>{" "}
            </Form.Select>{" "}
            <Button className="export-btn"> Export </Button>{" "}
            <Button className="add-btn"> Add New + </Button>{" "}
          </div>{" "}
        </div>
        <Table striped bordered hover className="appointments-table">
          <thead>
            <tr>
              <th> Patient Name </th> <th> Department </th> <th> Date </th>{" "}
              <th> Time </th> <th> Status </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {filteredAppointments.map((appt) => (
              <tr key={appt._id}>
                <td> {appt.patient} </td> <td> Radiology </td>{" "}
                <td> {appt.date} </td> <td> {appt.time} </td>{" "}
                <td>
                  <span className={`status-badge ${appt.status.toLowerCase()}`}>
                    {" "}
                    {appt.status}{" "}
                  </span>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </Table>{" "}
      </Container>{" "}
    </div>
  );
}

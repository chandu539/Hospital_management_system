import React from "react";
import {
  FaTachometerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaPills,
  FaChartBar,
  FaCog,
  FaHeadset,
} from "react-icons/fa";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2> Medical Dashboard </h2>{" "}
      <Nav className="flex-column">
        <Nav.Link href="#" className="active">
          {" "}
          <FaTachometerAlt /> Dashboard{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaUserMd /> Doctors{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaCalendarAlt /> Appointments{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaUsers /> Patients{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaPills /> Pharmacy{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaChartBar /> Charts{" "}
        </Nav.Link>{" "}
        <hr />
        <Nav.Link href="#">
          {" "}
          <FaCog /> Settings{" "}
        </Nav.Link>{" "}
        <Nav.Link href="#">
          {" "}
          <FaHeadset /> Help Center{" "}
        </Nav.Link>{" "}
      </Nav>{" "}
    </div>
  );
};

export default Sidebar;

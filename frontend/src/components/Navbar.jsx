import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchDoctorProfile(token);
    } else {
      setIsLoggedIn(false);
    }

    // Clean up on unmount
    return () => socket.disconnect();
  }, []);

  const fetchDoctorProfile = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/doctors/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLoggedIn(true);
      setDoctorName(res.data.name || "Doctor");
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsLoggedIn(false);
    }
  };

  // Listen for real-time notifications
  useEffect(() => {
    // ✅ Listen for login event
    socket.on("doctor-logged-in", (data) => {
      setNotifications((prev) => [
        ...prev,
        { message: `${data.name} has logged in`, id: Date.now() },
      ]);
    });

    socket.on("patient-registered", (data) => {
      setNotifications((prev) => [
        ...prev,
        { message: data.message, id: Date.now() },
      ]);
    });

    socket.on("patient-discharged", (data) => {
      setNotifications((prev) => [
        ...prev,
        { message: data.message, id: Date.now() },
      ]);
    });

    return () => {
      socket.off("doctor-logged-in");
      socket.off("patient-registered");
      socket.off("patient-discharged");
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light px-4 shadow-sm navbar-expand-lg" style={{ backgroundColor: "white" }}>
      <div className="d-flex align-items-center w-100">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-light text-muted">
            <FaSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        <div className="ms-auto d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <div className="position-relative me-3" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
                <button className="btn btn-light">
                  <FaBell />
                  {notifications.length > 0 && (
                    <span className="badge rounded-pill bg-danger">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="bg-white shadow-sm p-2">
                    {notifications.map((notif, index) => (
                      <p key={index}>{notif.message}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown">
                <button className="btn">{doctorName}</button>
              </div>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

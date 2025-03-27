import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

// Connect to Socket.io server
const socket = io("http://localhost:5001");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up socket connection on unmount
    return () => socket.disconnect();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/doctors/login", {
        email,
        password,
      });

      console.log("✅ Login successful", response.data);
      alert("Login successful!");

      if (response.data.token && response.data.user) {
        // Store the token and user data
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Emit socket event with logged-in user’s name
        socket.emit("doctor-logged-in", { name: response.data.user.name });

        // Redirect to profile
        navigate("/profile");
      }
    } catch (error) {
      console.error("❌ Login error:", error.response?.data?.error || error.message);
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f8f9fa",
    },
    card: {
      width: "400px",
      padding: "20px",
      background: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      color: "#333",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      backgroundColor: "#48f0dc",
      color: "white",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
    },
    alert: {
      textAlign: "center",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    danger: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>Login</h3>

        {message && (
          <div
            style={{
              ...styles.alert,
              ...(message.includes("Failed") ? styles.danger : styles.success),
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div>
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              style={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        // 1️⃣ Get user data from localStorage
        const token = localStorage.getItem("authToken");
        const userString = localStorage.getItem("user");

        console.log("Raw user data from localStorage:", userString);

        if (!userString) {
          throw new Error("User data not found in localStorage.");
        }

        let user;
        try {
          user = JSON.parse(userString);
          console.log("Parsed user object:", user);
          if (!user || !user._id) throw new Error("Invalid user data structure.");
        } catch (parseError) {
          throw new Error("Error parsing user data from localStorage.");
        }

        console.log("User ID:", user._id);

        // 2️⃣ Make API call to fetch doctor profile
        const response = await axios.get(`http://localhost:5000/api/doctors/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (!response.data) {
          throw new Error("Invalid response from server.");
        }

        setDoctor(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      {doctor && (
        <>
          <img
            src={`http://localhost:5000/uploads/${doctor.profileImage}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Availability:</strong> {doctor.availability}</p>
        </>
      )}
    </div>
  );
};

export default Profile;

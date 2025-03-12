

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PrescriptionPage = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    diagnosis: "",
    medicine: "",
    dosage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      patientName: formData.patientName,
      age: parseInt(formData.age),
      diagnosis: formData.diagnosis,
      prescriptions: [{ medicine: formData.medicine, dosage: formData.dosage }],
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/medical/add",
        newRecord
      );
      alert("Record Added Successfully");
      console.log(res.data);
    } catch (error) {
      console.error("Error adding record", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Add Medical Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Patient Name</label>
            <input
              type="text"
              name="patientName"
              className="form-control"
              placeholder="Enter Patient Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control"
              placeholder="Enter Age"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Diagnosis</label>
            <input
              type="text"
              name="diagnosis"
              className="form-control"
              placeholder="Enter Diagnosis"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Medicine</label>
            <input
              type="text"
              name="medicine"
              className="form-control"
              placeholder="Enter Medicine Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dosage</label>
            <input
              type="text"
              name="dosage"
              className="form-control"
              placeholder="Enter Dosage"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionPage;
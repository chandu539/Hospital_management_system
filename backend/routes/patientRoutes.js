const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Add New Patient
router.post("/add", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: "Patient added successfully!", patient: newPatient });
  } catch (error) {
    res.status(500).json({ error: "Failed to add patient", details: error.message });
  }
});

// get all patients
router.get("/", async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patients", details: error.message });
    }
  });

// get patient detials by id
router.get("/:id", async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.json(patient);
    } catch (error) {
      console.error("Error fetching patient:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
module.exports = router;

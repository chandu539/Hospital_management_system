const express = require("express");
const router = express.Router();

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

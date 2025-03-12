const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

// Get all appointments
router.get("/", async(req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
});

// Create an appointment
router.post("/", async(req, res) => {
    const { patient, doctor, date, time } = req.body;

    // Check doctor availability
    const existingAppointment = await Appointment.findOne({ doctor, date, time });
    if (existingAppointment) return res.status(400).json({ message: "Doctor not available at this time." });

    const newAppointment = new Appointment({ patient, doctor, date, time, status: "Scheduled" });
    await newAppointment.save();
    res.status(201).json(newAppointment);
});

// Update appointment status
router.put("/:id", async(req, res) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
});

// Delete appointment
router.delete("/:id", async(req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
});

module.exports = router;
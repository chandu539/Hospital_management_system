const Appointment = require("../models/Appointment");

// Get all appointments
exports.getAppointments = async(req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
};

// Create an appointment
exports.createAppointment = async(req, res) => {
    const { patient, doctor, date, time } = req.body;
    const existing = await Appointment.findOne({ doctor, date, time });
    if (existing) return res.status(400).json({ message: "Doctor not available" });

    const appointment = new Appointment({ patient, doctor, date, time, status: "Scheduled" });
    await appointment.save();
    res.status(201).json(appointment);
};

// Update appointment
exports.updateAppointment = async(req, res) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
};

// Delete appointment
exports.deleteAppointment = async(req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
};
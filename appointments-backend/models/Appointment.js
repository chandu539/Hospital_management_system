const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    doctor: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Pending", "Canceled"], default: "Pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
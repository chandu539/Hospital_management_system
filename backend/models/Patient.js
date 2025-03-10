const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  bloodGroup: { type: String, required: true },
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

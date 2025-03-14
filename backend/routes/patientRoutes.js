const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

// 📌 Fetch all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
});

// 📌 Fetch a single patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient', error });
    }
});



module.exports = router;

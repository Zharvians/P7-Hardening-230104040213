const express = require('express');
const router = express.Router();

const controller = require('../controllers/studentsController');
const validateStudent = require('../middleware/validateStudent');

// GET all
router.get('/', controller.getAllStudents);

// GET by id
router.get('/:id', controller.getStudentById);

// POST create
router.post('/', validateStudent, controller.createStudent);

// PUT update
router.put('/:id', validateStudent, controller.updateStudent);

// DELETE
router.delete('/:id', controller.deleteStudent);

module.exports = router;

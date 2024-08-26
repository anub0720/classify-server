const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classesController');

router.post('/newclass', classesController.createClass);
router.get('/getclasses', classesController.getClasses);
router.get('/getclass/:classId', classesController.getClassById);
router.post('/joinclass', classesController.joinClass);
//router.get('/getstudentclasses/:studentEmail', classesController.getStudentClasses); 
router.get('/studentclasses/:email', classesController.getClassesForStudent);

router.post('/removeStudent', classesController.removeStudent);
module.exports = router;

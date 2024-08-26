const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  studentEmails: {
    type: [String], // Array of student emails
    default: [],
  },
});

const Class = mongoose.model('class', classSchema);

module.exports = Class;

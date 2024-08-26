const Class = require('../models/class');

module.exports.createClass = async (req, res) => {
  const { className, subjectName, teacherName, grade, userEmail } = req.body;

  try {
    const newClass = new Class({
      className,
      subjectName,
      teacherName,
      grade,
      userEmail,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ error: 'Failed to create class' });
  }
};

module.exports.getClasses = async (req, res) => {
  const { email } = req.query;

  try {
    const classes = await Class.find({ userEmail: email });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.getClassById = async (req, res) => {
  const { classId } = req.params;

  try {
    const classDetails = await Class.findById(classId);
    res.json(classDetails);
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.joinClass = async (req, res) => {
  const { className, teacherName, classId, studentEmail } = req.body;
  

  try {
    const query = classId ? { _id: classId } : { className, teacherName };

    const classToJoin = await Class.findOne(query);
    const userEmail=classToJoin.userEmail;
    if (classToJoin) {
       
      if (!classToJoin.studentEmails.includes(studentEmail) && userEmail!=studentEmail) {
        classToJoin.studentEmails.push(studentEmail);
        await classToJoin.save();
        res.status(200).json({ message: 'Successfully joined the class' });
      } else {
        res.status(400).json({ error: 'Error,either student already in class or the user is teacher' });
      }
    } else {
      res.status(404).json({ error: 'Class not found' });
    }
  } catch (error) {
    console.error('Error joining class:', error);
    res.status(500).json({ error: 'Failed to join class' });
  }
};
module.exports.getClassesForStudent = async (req, res) => {
  const { email } = req.params;

  try {
    const classes = await Class.find({ studentEmails: email });
    res.json(classes);
  } catch (error) {
    console.error('Error fetching student classes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.removeStudent = async (req, res) => {
  const { classId, studentEmail } = req.body;

  try {
    const classToUpdate = await Class.findById(classId);

    if (classToUpdate) {
      if (classToUpdate.studentEmails.includes(studentEmail)) {
        classToUpdate.studentEmails = classToUpdate.studentEmails.filter(email => email !== studentEmail);
        await classToUpdate.save();
        res.status(200).json({ message: 'Student removed successfully' });
      } else {
        res.status(400).json({ error: 'Student not found in this class' });
      }
    } else {
      res.status(404).json({ error: 'Class not found' });
    }
  } catch (error) {
    console.error('Error removing student:', error);
    res.status(500).json({ error: 'Failed to remove student' });
  }
};

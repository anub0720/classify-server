const express = require('express');
const { addAnnouncement, getAnnouncements,deleteAnnouncement } = require('../controllers/announcementController');

const router = express.Router();

// Route to add a new announcement
router.post('/add', addAnnouncement);

// Route to get all announcements for a specific class
router.get('/:classId', getAnnouncements);
router.delete('/:id', deleteAnnouncement);
module.exports = router;

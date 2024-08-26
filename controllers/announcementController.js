const Announcement = require('../models/announcements');

// Add a new announcement
module.exports.addAnnouncement = async (req, res) => {
  try {
    const { text, classId } = req.body;

    const newAnnouncement = new Announcement({
      text,
      classId,
    });

    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement added successfully', announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add announcement', error: error.message });
  }
};

// Get all announcements for a specific class
module.exports.getAnnouncements = async (req, res) => {
  try {
    const { classId } = req.params;

    const announcements = await Announcement.find({ classId }).sort({ createdAt: -1 });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve announcements', error: error.message });
  }
};
module.exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete announcement', error: error.message });
  }
};
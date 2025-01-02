const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const Image = require('../models/Image');

// Development-only registration route (optional)
router.post('/register', registerAdmin);

// Login route
router.post('/login', loginAdmin);

/*
  Example Admin-only route to fetch all contact messages
  GET /api/admin/messages
*/
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
});

/*
  Example Admin-only route to delete an image
  DELETE /api/admin/images/:id
*/
router.delete('/images/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.json({ msg: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
});

module.exports = router;

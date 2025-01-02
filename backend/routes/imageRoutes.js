const express = require('express');
const router = express.Router();
const { getImages, addImage } = require('../controllers/imageController');
const auth = require('../middleware/auth');

// Public route to get images
router.get('/', getImages);

// Admin route to add new image
router.post('/',  auth, addImage);

module.exports = router;

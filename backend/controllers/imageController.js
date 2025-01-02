const Image = require('../models/Image');

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add new image (for admin usage, typically)
exports.addImage = async (req, res) => {
  try {
    const newImage = new Image({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description
    });
    const savedImage = await newImage.save();
    res.json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const Contact = require('../models/Contact');

// Save contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

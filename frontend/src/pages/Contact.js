import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="contact">
      <h2>Contact Me</h2>
      {status && <p className="contact-status">{status}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;

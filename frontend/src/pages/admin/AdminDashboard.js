import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('images');
  const [images, setImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newImage, setNewImage] = useState({ url: '', title: '', description: '' });

  useEffect(() => {
    // If no token, redirect to login
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    } else {
      // Load data
      fetchImages();
      fetchMessages();
    }
  }, [navigate]);

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/images');
      setImages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/images', newImage, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewImage({ url: '', title: '', description: '' });
      fetchImages(); // Refresh image list
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <hr />

      {/* Tab Navigation */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('images')}>Images</button>
        <button onClick={() => setActiveTab('messages')}>Messages</button>
      </div>

      {activeTab === 'images' && (
        <div>
          <h3>Images Management</h3>
          {/* Form to Add New Image */}
          <form onSubmit={handleImageSubmit} style={{ marginBottom: '2rem' }}>
            <h4>Add a New Image</h4>
            <div>
              <label>URL:</label>
              <input
                type="text"
                value={newImage.url}
                onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newImage.description}
                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              />
            </div>
            <button type="submit">Upload Image</button>
          </form>

          {/* List all images with delete option */}
          <h4>Existing Images</h4>
          <ul>
            {images.map((img) => (
              <li key={img._id} style={{ marginBottom: '1rem' }}>
                <img src={img.url} alt={img.title} style={{ width: '100px', marginRight: '1rem' }} />
                <strong>{img.title}</strong> - {img.description}
                <button onClick={() => handleDeleteImage(img._id)} style={{ marginLeft: '1rem' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'messages' && (
        <div>
          <h3>Contact Messages</h3>
          {messages.map((msg) => (
            <div key={msg._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p><em>Received on: {new Date(msg.createdAt).toLocaleString()}</em></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

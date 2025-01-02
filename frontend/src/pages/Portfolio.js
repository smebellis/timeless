import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard';
import './Portfolio.css';

function Portfolio() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from your backend
    axios.get('/api/images')
      .then(res => {
        setImages(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="portfolio">
      <h2>My Portfolio</h2>
      <div className="portfolio-grid">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;

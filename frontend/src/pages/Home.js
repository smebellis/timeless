import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    // For demonstration, we might load the hero image from backend or use a static resource
    // setHeroImage('path/to/your/heroImage.jpg');
    // Or fetch from an endpoint:
    // axios.get('/api/hero').then(res => setHeroImage(res.data));
    setHeroImage('/hero.jpg'); // Example static image
  }, []);

  return (
    <div className="home">
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-text">
          <h1>Capturing Life's Moments</h1>
          <p>Professional Photography by [Your Name]</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

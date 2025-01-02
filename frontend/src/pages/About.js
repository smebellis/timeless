import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <h2>About Me</h2>
      <div className="about-content">
        <img src="/myportrait.jpg" alt="Photographer" className="about-portrait" />
        <p>
          Hello! I’m [Your Name], a professional photographer specializing in 
          portrait, event, and nature photography. I love capturing candid moments 
          and creating timeless memories for my clients. 
        </p>
      </div>
    </div>
  );
}

export default About;

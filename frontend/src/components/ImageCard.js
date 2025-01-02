import React from 'react';
import './ImageCard.css';

function ImageCard({ image }) {
  return (
    <div className="image-card">
      <img src={image.url} alt={image.title} />
      <div className="image-card__info">
        <h3>{image.title}</h3>
        <p>{image.description}</p>
      </div>
    </div>
  );
}

export default ImageCard;

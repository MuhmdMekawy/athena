import React from 'react';
import '../styles/css/global styles/style.css'; // Import the CSS file for styling

function FixedRating({ rating }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    // Render filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-filled">&#9733;</span>);
    }

    // Render unfilled stars
    for (let i = filledStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<span key={i} className="star">&#9734;</span>);
    }

    return stars;
  };

  return <div className="fixed-rating">{renderStars()}</div>;
}

export default FixedRating;

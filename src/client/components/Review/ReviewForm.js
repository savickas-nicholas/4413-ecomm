import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

export default function ReviewForm({ addReview }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(1);


  const handleSubmit = () => {
    // add error checking

    addReview({
      title,
      summary, 
      rating
    });
  }

  const drawStars = () => {
    let stars = [];
    for(let i = 1; i <= 5; i++) {
      let icon = i <= rating ? faStar : emptyStar;
      let color = i <= rating ? 'gold' : 'grey';
      let star = <FontAwesomeIcon icon={icon} style={{color: color, cursor: 'pointer'}}
        onClick={() => setRating(i)} /> 
      stars.push(star);
    }
    return stars;
  }

  return (
    <div>
      <div className='form-group'>
        <label htmlFor='rating'>Rating:</label>
        <div>
          { drawStars().map(elem => {
            return elem;
          })}
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='title'>Title:</label>
        <input type='text' id='title' value={title} className='form-control'  
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='form-group'>
        <label htmlFor='summary'>Summary:</label>
        <input type='text' id='summary' value={summary} className='form-control'  
          onChange={(e) => setSummary(e.target.value)} />
      </div>
      <button className='btn btn-secondary' onClick={() => handleSubmit()}>Publish</button>
    </div>
  );
}

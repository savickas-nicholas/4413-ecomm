import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

export default function ReviewForm({ addReview, setFormActive }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(1);


  const handleSubmit = () => {
    addReview({
      title,
      summary, 
      rating
    });
    setSummary('');
    setTitle('');
    setRating(1);
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
    <div className='border rounded padding-10'>
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
      <div className='flex-column-align-center'>
        <div className='flex-row'>
          <button className='btn btn-success' onClick={() => handleSubmit()}>Publish</button>
          <button className='btn btn-warning' onClick={() => setFormActive(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

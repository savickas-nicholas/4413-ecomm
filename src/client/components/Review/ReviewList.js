import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import http from '../../util/httpCaller';

import ReviewForm from './ReviewForm';

export default function ReviewList({ vehicleId }) {
  const [formActive, setFormActive] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { createAlert, currentUser } = useOutletContext();

  // populate reviews on page load
  useEffect(() => {
    http.get(`/api/reviews/`, { 
        params: { vehicle: vehicleId }
      }).then((res) => {
        let reviews = res.data.reviews;
        setReviews(reviews);
    });
  }, []);


  const drawStars = (rating) => {
    let stars = [];
    for(let i = 1; i <= 5; i++) {
      let icon = i <= rating ? faStar : emptyStar;
      let color = i <= rating ? 'gold' : 'grey';
      let star = <FontAwesomeIcon icon={icon} style={{color: color}} /> 
      stars.push(star);
    }
    return stars;
  }


  const addReview = (payload) => {
    payload.vehicle = vehicleId;
    payload.author = currentUser._id;
    console.log(payload)

    http.post(`/api/reviews/`, payload).then((res) => {
      console.log(res);
      let newReviews = reviews;
      newReviews.push(res.data.review);
      createAlert("Review published!", "success");
      setReviews(newReviews);
      setFormActive(false);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <div className='flex-column-align-center'>
        <h4>Reviews</h4>
      </div>
      { reviews.length > 0 ?  
        <div>
          { reviews.map(r => {
            console.log(r);
            return (
              <div className='flex-column-sections'>
                <div>{drawStars(r.rating)} <strong>{r.title}</strong></div>
                <div>{r.summary}</div>
                <div>Publish by: {r.author.name}</div>
              </div>
            )
          })}
        </div>
        : 
        <div>There are no reviews for this model.</div>
      }
      <hr />
      { currentUser && !formActive && 
        <button onClick={() => setFormActive(true)}>Add Review</button>
      } 
      { currentUser && formActive &&  
        <div>
          <ReviewForm addReview={addReview} />
          <div className='flex-column-align-center'>
            <button onClick={() => setFormActive(false)}>Cancel</button>
          </div>
        </div>
      }
    </div>
  );
}

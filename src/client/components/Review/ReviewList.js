import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';


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
      <div>Reviews</div>
      { reviews.length > 0 ?  
        <div>
          { reviews.map(r => {
            return (
              <div>
                <div>Rating: {r.rating}</div>
                <div>Title: {r.title}</div>
                <div>Summary: {r.summary}</div>
              </div>
            )
          })}
        </div>
        : 
        <div>There are no reviews for this model.</div>
      }
      { currentUser && !formActive && 
        <button onClick={() => setFormActive(true)}>Add Review</button>
      } 
      { currentUser && formActive &&  
        <div>
          <ReviewForm addReview={addReview} />
          <button onClick={() => setFormActive(false)}>Cancel</button>
        </div>
      }
    </div>
  );
}

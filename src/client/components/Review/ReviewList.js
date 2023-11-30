import React, { useState, useEffect } from 'react';

import http from '../../util/httpCaller';

export default function ReviewList({ vehicleId }) {

  const [reviews, setReviews] = useState([]);

  // populate reviews on page load
  useEffect(() => {
    http.get(`/api/reviews/`, { 
        params: { vehicle: vehicleId }
      }).then((res) => {
        let reviews = res.data.reviews;
        setReviews(reviews);
    });
  }, []);


  return (
    <div>
      <h1>Reviews for Vehicle Name</h1>
      <ul>
        <li>
          { /** Expands a model to show the review when clicked */ }
          <div onClick={() => selectReviewModel}>
            <h3>
              Title
              <div>Rating</div>
            </h3>
            <h4>Author</h4>
            <p>Review Summary</p>
          </div>
        </li>

        <li>
          <div onClick={() => selectReviewModel}>
            <h3>
              Title
              <div>Rating</div>
            </h3>
            <h4>Author</h4>
            <p>Review Summary</p>
          </div>
        </li>

        <li>
          <div onClick={() => selectReviewModel}>
            <h3>
              Title
              <div>Rating</div>
            </h3>
            <h4>Author</h4>
            <p>Review Summary</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

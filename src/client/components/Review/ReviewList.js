import React, { useState } from 'react';


export default function Review() {

  const [review, SetReview] = useState(null);

  const selectReviewModel = (index) => {

  }

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

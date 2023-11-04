import _ from 'lodash';
import Review from './review.model';

// Get list of reviews
export const searchReviews = async (req, res) => {
  try {
    let reviews = await Review.find(req.query);
    return res.status(200).json({reviews});
  } catch(err) {
    return handleError(res, err);
  }
};

// Get a single review
export const getReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id)
      .populate('vehicle', '_id name')
      .populate('author', '_id name');
    
    if(!review) { return res.status(404).send('Not Found'); }
    return res.status(200).json({review});
  } catch(err) {
    return handleError(res, err);
  }
};

/* Creates a new review in the DB.
* Title
* Summary
* Rating
*/
export const createReview = async (req, res) => {
  if(req.body.title === null || req.body.summary === null || req.body.rating === null) {
    return res.status(404).send("Invalid POST body!");
  }
  
  try {
    let review = await Review.create(req.body);
    return res.status(201).json({review});
  } catch(err) {
    return handleError(res, err);
  }
};

// update an existing review in the DB.
export const updateReview = async (req, res) => {
  try {
    let review = await Review.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true})
    .populate('vehicle author', '_id name');
    return res.status(200).json({review});
  } catch(err) {
    return handleError(res, err);
  }
};

// delete a review from the DB.
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch(err) {
    return handleError(res, err);
  }
};

function handleError(res, err) {
  return res.status(404).send(err);
}


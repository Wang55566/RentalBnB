const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, ReviewImage, SpotImage }= require('../../db/models');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  const reviews = await Review.findAll({

    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot,
        include: [{ model: SpotImage }]
      },
      { model: ReviewImage, attributes: ['id', 'url'] },
    ],
    where: {
      userId: user.dataValues.id
    }
  })

  const reviewsArr = [];

  reviews.forEach(review => {
    reviewsArr.push(review.toJSON());
  })

  reviewsArr.forEach(review => {
    if(review.Spot.SpotImages[0] && review.Spot.SpotImages[0].preview) {
      review.Spot.previewImage = review.Spot.SpotImages[0].url
    } else {
      review.Spot.previewImage = 'No preview in this spot'
    }
    delete review.Spot.SpotImages;
  })

  res.json({Reviews: reviewsArr});
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  const { url } = req.body;

  // Error response: Couldn't find a Review with the specified id
  const review = await Review.findByPk(req.params.reviewId);

  if(!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  // Require proper authorization: Review must belong to the current user
  if(review.userId !== user.dataValues.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }


  // Error response: Cannot add any more images because there is a maximum of 10 images per resource
  const images = await ReviewImage.findAll({
    where: {
      reviewId: req.params.reviewId
    }
  })

  if(images.length >= 10) {
    const err = new Error("Maximum number of images for this resource was reached");
    err.status = 403;
    throw err;
  }

  // Create and return a new image for a review specified by id.
  const reviewImage = await ReviewImage.create({
    url,
    reviewId: req.params.reviewId
  })

  res.json(reviewImage)
})

// Edit a Review
router.put('/:reviewId', restoreUser, requireAuth, async (req, res) => {

  const { review, stars } = req.body;
  const { user } = req;

  // Error response: Couldn't find a Review with the specified id
  const currentReview = await Review.findByPk(req.params.reviewId);
  if(!currentReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    throw err;
  }

  // Require proper authorization: Review must belong to the current user
  if(currentReview.userId !== user.dataValues.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  // Error Response: Body Validation Errors
  if(review.length < 1 || stars < 1 || stars > 5) {
    const err = new Error("Validation error");
    err.errors = {
      "review": "Review text is required",
      "stars": "Stars must be an integer from 1 to 5"
    }
    err.status = 400;
    throw err;
  }

  // Finally Edit a Review
  await currentReview.update({...req.body})
  await currentReview.save();

  res.json(currentReview);
})

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    statusCode: err.status,
    errors: err.errors
  })
})

module.exports = router;

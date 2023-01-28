const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking }= require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const {sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      {model: SpotImage},
      // avgRating
      {model: Review}
    ],
  });

  const spotsArr = [];
  spots.forEach(spot => {
    spotsArr.push(spot.toJSON());
  })

  spotsArr.forEach(spot => {
    // avgRating
    if(spot.Reviews.length > 0) {
      let sum = 0;
      for(let obj of spot.Reviews) {
        sum += obj.stars;
      }
      spot.avgRating = (sum / spot.Reviews.length).toFixed(1);
    } else {
      spot.avgRating = 0;
    }
    delete spot.Reviews;

    // previewImage
    if(spot.SpotImages[0] && spot.SpotImages[0].preview) {
      spot.previewImage = spot.SpotImages[0].url
    } else {
      spot.previewImage = 'No preview in this spot'
    }
    delete spot.SpotImages;
  })

  res.json( {Spots:spotsArr} );
})

// Middleware for Create A Spot
const validateCreateASpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors
];

// Creat A Spot
// Require Authentication: true
router.post('/', restoreUser, requireAuth, validateCreateASpot, async (req, res) => {

  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const { user } = req;

  const spot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId : user.dataValues.id
  });

  res.json(spot)
})

// Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.dataValues.id
    },
    include: [
      {model: SpotImage},
      // avgRating
      {model: Review}
    ]
  })

  const spotsArr = [];
  spots.forEach(spot => {
    spotsArr.push(spot.toJSON());
  })

  spotsArr.forEach(spot => {
    // avgRating
    if(spot.Reviews.length > 0) {
      let sum = 0;
      for(let obj of spot.Reviews) {
        sum += obj.stars;
      }
      spot.avgRating = (sum / spot.Reviews.length).toFixed(1);
    } else {
      spot.avgRating = 0;
    }
    delete spot.Reviews;

    // previewImage
    if(spot.SpotImages[0] && spot.SpotImages[0].preview) {
      spot.previewImage = spot.SpotImages[0].url
    } else {
      spot.previewImage = 'No preview in this spot'
    }
    delete spot.SpotImages;
  })

  res.json( {Spots:spotsArr} );
})

// Create an Image for a Spot
// Require Authentication: true
// Require proper authorization: Spot must belong to the current user
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

  // Looking for the spot by spotId
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  })

  // Error response: Couldn't find a Spot with the specified id
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  // Compare Spot's OwnerId with Login User's id
  if(spot.ownerId === user.dataValues.id) {

    const { url, preview } = req.body;
    const image = await SpotImage.create({
      url,
      preview,
      spotId: req.params.spotId
    })

    res.json({
      id: image.id,
      url:image.url,
      preview: image.preview
    });
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
})

// Get Details of a Spot from an id
// Require Authentication: false
router.get('/:spotId', async (req, res) => {


  // Looking for the spot by spotId
  const spot = await Spot.findOne({
      where: {
        id:req.params.spotId
      },
      include: [
      { model: User, as: 'Owner', attributes: ['id' ,'firstName', 'lastName' ] },
      { model: SpotImage, attributes: ['id', 'url', 'preview'] }
    ]
  })

  // Find Reviews with the spotId
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
  })

  // include: [ [sequelize.fn('avg', sequelize.col('stars')),'avgStarRating'] ]

  // Error response: Couldn't find a Spot with the specified id
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err
  }

  // numReviews
  const reivewCount = await Review.count({
    where: {
      spotId: req.params.spotId
    }
  })

  // Calculate sum in order to get avg
  let sum = 0;
  for(let review of reviews) {
    sum += review.dataValues.stars;
  }
  // POJO manipulation
  const spotObj = spot.toJSON();
  spotObj.numReviews = reivewCount;

  if(reviews.length === 0) spotObj.avgStarRating = 0;
  else spotObj.avgStarRating = (sum / reviews.length).toFixed(1);

  res.json(spotObj);
})

// Edit a Spot
// Require Authentication: true
// Require proper authorization: Spot must belong to the current user
router.put('/:spotId', restoreUser, requireAuth, validateCreateASpot, async (req, res) => {

  const { user } = req;

  // Looking for the spot by spotId
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  })

  // Error response: Couldn't find a Spot with the specified id
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  // Compare Spot's OwnerId with Login User's id
  if(spot.ownerId === user.dataValues.id) {

    await spot.update({...req.body});
    await spot.save();
    return res.json(spot);
  } else {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {

  // Looking for the spot by spotId
  const spot = await Spot.findByPk(req.params.spotId);

  // Error response: Couldn't find a Spot with the specified id
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  const reviews = await Review.findAll({
    where: {spotId: req.params.spotId},
    include: [
      { model: User, attributes: ['id' ,'firstName', 'lastName' ] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  })

  // No reviews for the spot
  if(reviews.length < 1) {
    return res.json({
      message: "The spot has no reviews yet."});
  }

  res.json({ Reviews: reviews });
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', restoreUser, requireAuth, async (req, res) => {

  const {review ,stars} = req.body;
  const {user} = req;

  // Error response: Couldn't Find a Spot with the specified id
  const spot = await Spot.findByPk(req.params.spotId);
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err
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

  // Error response: Review from the current user already exists for the Spot
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }
  })

  reviews.forEach(review => {
    if(review.userId === user.dataValues.id) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      throw err;
    }
  })

  // Create a Review for a Spot as a Login User
  const reviewQuery = await Review.create({
    review,
    stars,
    spotId: req.params.spotId,
    userId: user.dataValues.id
  })

  res.json(reviewQuery)
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {

  const { startDate, endDate } = req.body;
  const { user } = req;

  const start = Date.parse(startDate);
  const end = Date.parse(endDate);

  const date = new Date();
  const currentDate = Date.parse(date);


  // Error response: Couldn't find a Spot with the specified id
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [ {model: Booking} ]
  });
  if(!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    throw err;
  }

  // Error response: Body validation errors
  if(end <= start) {
    const err = new Error("Validation error");
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot be on or before startDate"
    }
    throw err;
  }

  // Error response: No booking for the past
  if(start <= currentDate) {
    const err = new Error("Start date cannot be in the past")
    err.status = 403,
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking"
    }
    throw err;
  }

  // Error response: Booking conflict
  const spotObj = spot.toJSON();

  for(let el of spotObj.Bookings) {
    const bookingStartDate = Date.parse(el.startDate);
    const bookingEndDate = Date.parse(el.endDate);
    if( ( (start < bookingEndDate && start > bookingStartDate)
        || start === bookingEndDate
        || start === bookingStartDate ) ||
        ( (end < bookingEndDate && end > bookingStartDate)
        || end === bookingEndDate
        || end === bookingStartDate ) ) {

        const err = new Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403,
        err.errors = {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
        throw err;
    }
  }

  // Finally Create a Booking
  const booking = await Booking.create ({
    userId: user.dataValues.id,
    spotId: req.params.spotId,
    startDate,
    endDate
  })

  res.json(booking)
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {

  const {user} = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if(!spot) {
    const err = new Error("Spot couldn't be found")
    err.status = 404
    throw err;
  }

  const bookings = await Booking.findAll({
    include: [{model: User, attributes: ['id', 'firstName', 'lastName']}],
    where: {
      spotId: req.params.spotId
    }
  })

  if(bookings.length < 1) {
    const err = new Error("Bookings on this spot couldn't be found")
    err.status = 404
    throw err;
  }

  if(spot.ownerId === user.dataValues.id) {
    res.json({
      Bookings: bookings
    })
  } else {
    const arr = [];
    arr.push({
      spotId : bookings[0].dataValues.spotId,
      startDate: bookings[0].dataValues.startDate,
      endDate: bookings[0].dataValues.endDate
    })
    res.json({
      Bookings: arr
    })
  }
})

// Deletes an existing spot
router.delete('/:spotId', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if(!spot) {
    const err = new Error("Spot couldn't be found")
    err.status = 404
    throw err;
  }
  
  if(user.dataValues.id !== spot.ownerId) {
    const err = new Error("Forbidden")
    err.status = 403
    throw err;
  }

  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    statusCode: err.status,
    errors: err.errors
  });
});

module.exports = router;

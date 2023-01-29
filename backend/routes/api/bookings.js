const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking }= require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { sequelize } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', restoreUser, requireAuth, async (req, res) => {

  const  { user } = req;

  const bookings = await Booking.findAll({

    include: [
      { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
      include: [{ model: SpotImage }] }
    ],
    where: {
      userId: user.dataValues.id
    }
  });

  const bookingsArr = [];

  bookings.forEach(booking => {
    bookingsArr.push(booking.toJSON());
  })

  for(let el of bookingsArr) {
    if(el.Spot.SpotImages.length > 1) {
      for(let i = 0; i < el.Spot.SpotImages.length; i++) {
        if(el.Spot.SpotImages[i].preview) {
          el.Spot.previewImage = el.Spot.SpotImages[i].url;
        }
      }
    }
    if(!el.Spot.previewImage) {
      el.Spot.previewImage = 'Preview is not available'
    }

    delete el.Spot.SpotImages;
  }

  res.json({
    Bookings: bookingsArr
  });
})

// Delete an existing booking
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

  // Looking for the booking
  const booking = await Booking.findOne({
    where: {
      id: req.params.bookingId
    }
  })

  // Booking does not exist
  if(!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  // Request: endpoints that require proper authorization
  if(booking.userId !== user.dataValues.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  // Error response: Bookings that have been started can't be deleted
  const start = Date.parse(booking.startDate);
  const end = Date.parse(booking.endDate);

  const date = new Date();
  const currentDate = Date.parse(date);
  if( (start < currentDate && end > currentDate)
       || start === currentDate
       || end === currentDate ) {
    const err = new Error("Bookings that have been started can't be deleted")
    err.status = 403
    throw err
  }

  // Finally delete a booking
  await booking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })

})

// Edit a Booking
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  const { startDate, endDate } = req.body;

  const date = new Date();
  const currentDate = Date.parse(date);

  // Looking for the booking
  const booking = await Booking.findOne({
    where: {
      id: req.params.bookingId
    }
  })

  // Booking does not exist
  if(!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    throw err;
  }

  // Request: endpoints that require proper authorization
  if(booking.userId !== user.dataValues.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }

  const start = Date.parse(startDate);
  const end = Date.parse(endDate);

  // Error response: Body validation errors
  if(end <= start) {
    const err = new Error("Validation error");
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot be on or before startDate"
    }
    throw err;
  }

  // Error response: Can't edit a booking that's past the end date
  if(currentDate > end) {
    const err = new Error("Past bookings can't be modified")
    err.status = 403
    throw err;
  }

  // Error response: Booking conflict

  // find the spot with association of bookings
  const spot = await Spot.findByPk(booking.spotId, {
    include: [ {model: Booking} ]
  });

  const spotObj = spot.toJSON();
  // iterate through bookings looking for conflict
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

  // Finally Edit a Booking
  await booking.update({...req.body});
  await booking.save();
  return res.json(booking);

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

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
      userid: user.dataValues.id
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

  res.json(bookingsArr);
})


module.exports = router;

const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage }= require('../../db/models');
const { json } = require('sequelize');
const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll();

  res.json(spots);
})

// Creat A Spot
router.post('/', restoreUser, requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const {user} = req;
  console.log(user.dataValues.id)
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
    }
  })
    res.json(spots);
})

// Create an Image for a Spot
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {

  const { url, preview } = req.body;
  const image = await SpotImage.create({
    url,
    preview,
    spotId: req.params.spotId
  })
  res.json(image);
})

module.exports = router;

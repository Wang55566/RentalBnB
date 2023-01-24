const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const Spot = require('../../db/models')
const User = require('../../db/models')
const router = express.Router();

// Get All Spots
router.get('/spots', async (req, res) => {

  let spots = await Spot.findAll();

  res.json(spots);
})

// Creat A Spot
router.post('/spots', async (req, res) => {
  const{ address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  res.json(spot)
})

//Get all Spots owned by the Current User
router.get('/spots/current', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  if (user) {
  const spots = Spot.findAll({
    where: {
      ownerId: user.ownerId
      }
    })
    res.json(spots);
  }
})

module.exports = router;

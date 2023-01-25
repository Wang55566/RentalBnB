const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User }= require('../../db/models')
const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll();

  res.json(spots);
})

// Creat A Spot
router.post('/', requireAuth, restoreUser, async (req, res) => {
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

//Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;
  if (user) {
  const spots = Spot.findAll({
    where: {
      ownerId: user.dataValues.id
      }
    })
    res.json(spots);
  }
})

module.exports = router;

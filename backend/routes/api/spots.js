const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage }= require('../../db/models');
// const { json } = require('sequelize');
const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll();

  res.json(spots);
})

// Creat A Spot
// Require Authentication: true
router.post('/', restoreUser, requireAuth, async (req, res) => {

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
    }
  })

  res.json(spots);
})

// Create an Image for a Spot
// Require Authentication: true
// Require proper authorization: Spot must belong to the current user
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

  // find the spot
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  })

  // compare spot's ownerId and login user's id
  if(spot.ownerId === user.dataValues.id) {

    const { url, preview } = req.body;
    const image = await SpotImage.create({
      url,
      preview,
      spotId: req.params.spotId
    })

    return res.json(image);
  }

   // Error
   throw new Error('does not work');

})

// Get Details of a Spot from an id
// Require Authentication: false
router.get('/:spotId', async (req, res) => {

  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  })

  res.json(spot);
})

// Edit a Spot
// Require Authentication: true
// Require proper authorization: Spot must belong to the current user
router.put('/:spotId', restoreUser, requireAuth, async (req, res) => {

  const { user } = req;

  // find the spot
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    }
  })

  // compare spot's ownerId and login user's id
  if(spot.ownerId === user.dataValues.id) {

    await spot.update({...req.body});
    await spot.save();
    return res.json(spot);
  }

  // Error
  throw new Error('does not work');
})

module.exports = router;

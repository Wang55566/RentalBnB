const express = require('express');
const {Spot} = require('../../db/models')
const router = express.Router();

router.get('/spots', async (req, res) => {

  const spots = await Spot.findAll();

  res.json(spots);
})

module.exports = router;

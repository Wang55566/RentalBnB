const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser, requireAuth } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//Test
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

//Test whether user is logged in
router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'User is logged in' });
});

module.exports = router;

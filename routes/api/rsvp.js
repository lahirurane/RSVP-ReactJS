const express = require('express');
const router = express.Router();

// Load Input Validation
const validateResponse = require('../../validation/response');

// Load User model
const Response = require('../../models/Response');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/rsvp/response
// @desc    User Response
// @access  Public
router.post('/response', (req, res) => {
  const { errors, isValid } = validateResponse(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const isAccepted = req.body.isAccepted === 'true';
  const type = req.body.type;

  const response = new Response({
    name: name,
    isAccepted: isAccepted,
    type: type
  });

  response
    .save()
    .then(result => {
      console.log('Data added');
      return res.status(200).json({
        result: 'success'
      });
    })
    .catch(err => {
      console.log('Something went wrong', err);
      return res.status(400).json({
        result: 'failed'
      });
    });
});

module.exports = router;

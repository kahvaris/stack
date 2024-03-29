const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Entry = require('../models/entry');
const User = require('../models/user');


// add diary entry
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log('JWT token:', req.headers.authorization);
  let newEntry = new Entry({
    title: req.body.title,
    date: req.body.date,
    entry: req.body.entry,
    user: req.user._id
  });
  console.log(newEntry);
  Entry.addEntry(newEntry, (err, entry) => {
    if(err) {
        res.json({success: false, msg: 'Failed to make a diary entry'});
    } else {
        res.json({success: true, msg: 'Diary entry made'});
    }
  });
});

// get diary entries of an user
router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const entries = await Entry.find({ user: req.user._id });
      res.json({ success: true, entries: entries });
  } catch (err) {
      res.status(500).json({ success: false, msg: 'Failed to fetch diary entries', error: err });
  }
});

module.exports = router;
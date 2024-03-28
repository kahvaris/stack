const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Entry = require('../models/entry');

// add diary entry
router.post('/add', (req, res) => {
  let newEntry = new Entry({
    title: req.body.title,
    date: req.body.date,
    entry: req.body.entry
  });
  Entry.addEntry(newEntry, (err, entry) => {
    if(err) {
        res.json({success: false, msg: 'Failed to make a diary entry'});
    } else {
        res.json({success: true, msg: 'Diary entry made'});
    }
  });
});

module.exports = router;
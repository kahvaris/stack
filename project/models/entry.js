const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Diary entry schema
const EntrySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    entry: {
        type: String,
        required: true
    }
});

const Entry = module.exports = mongoose.model('Entry', EntrySchema);


module.exports.addEntry = async function(newEntry, callback) {
    try {
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(newEntry.password, salt);
        // newEntry.password = hash;
        const savedEntry = await newEntry.save();
        callback(null, savedEntry);
    } catch (err) {
        callback(err);
    }
}
const mongoose = require('mongoose');
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Entry = module.exports = mongoose.model('Entry', EntrySchema);


module.exports.addEntry = async function(newEntry, callback) {
    try {
        const savedEntry = await newEntry.save();
        callback(null, savedEntry);
    } catch (err) {
        callback(err);
    }
}
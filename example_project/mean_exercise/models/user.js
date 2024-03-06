const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const { query } = require('express');

// User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// module.exports.getUserById = function(id, callback){
//     User.findById(id, callback);
// }

module.exports.getUserById = async function(id, callback){
    try {
        const user = await User.findById(id);
        callback(null, user);
    } catch (err) {
        callback(err);
    }
}

// module.exports.getUserByUsername = async function(username, callback){
//     const query = {username: username}
//     User.findOne(query, callback);
// }

module.exports.getUserByUsername = async function(username, callback) {
    try {
        const query = { username: username };
        const user = await User.findOne(query);
        callback(null, user);
    } catch (err) {
        callback(err);
    }
};

// module.exports.addUser = function(newUser, callback){
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) throw err;
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// }


module.exports.addUser = async function(newUser, callback) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const savedUser = await newUser.save();
        callback(null, savedUser);
    } catch (err) {
        callback(err);
    }
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
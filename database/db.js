const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/prDB');
const con = mongoose.connect;

module.exports = con;

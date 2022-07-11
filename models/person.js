const mongoose = require('mongoose');
const db = require("../database/db");
const passport = require('passport');
const passportlocalmongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const personschema = mongoose.Schema({
    username : String,
    password : String,
    phone : Number
});

personschema.plugin(passportlocalmongoose);
personschema.plugin(findOrCreate);

const personmodel = mongoose.model('personmodel',personschema,'persons');
module.exports = mongoose.model('personmodel',personschema);

module.exports = personmodel;
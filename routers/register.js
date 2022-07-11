const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const passportlocalmongoose = require('passport-local-mongoose');
//const personmodel = require("../models/person");
const personmodel = require("../models/person");
router.get('/',function(req,res)
{
    res.render("register");
});

router.post('/',function(req,res)
{
    const un = req.body.email;
    const ps = req.body.pas;

    const newperson = personmodel({username:un});
    personmodel.register(newperson,ps,function(err,person)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("secrets");
        }
    })
    /*
    newperson.save(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("secrets");
        }
    });*/
})

module.exports = router;
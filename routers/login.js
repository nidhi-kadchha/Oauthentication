const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const personmodel = require("../models/person");
const personmodel = require("../models/person");
router.get('/',function(req,res)
{
    res.render("login");
});

router.post('/',function(req,res)
{
    const un = req.body.email;
    const ps = req.body.pas;
   
    personmodel.findOne({username:un,password:ps},function(err)
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
})

module.exports = router;
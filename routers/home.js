const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/',function(req,res)
{
    res.render("home");
})

module.exports = router;
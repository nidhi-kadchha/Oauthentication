const express = require('express');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const passportlocalmongoose = require('passport-local-mongoose');
const googlestrategy = require('passport-google-oauth20').Strategy;
const personmodel = require("../oauth/models/person");
const findOrCreate = require('mongoose-findorcreate');
const config = require("../oauth/config");

const app = express();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bodyparser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyparser.json()) 

app.use(cookieparser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session(
    {secret:"012345-67890-09876-54321",
    resave:false,
    cookie:{maxAge:oneDay},
    saveUninitialized:false}
    ));

    app.use(passport.initialize());
    app.use(passport.session());
    
    //passport.use(createStrategy());
    passport.use(personmodel.createStrategy());
    passport.serializeUser(personmodel.serializeUser());
    passport.deserializeUser(personmodel.deserializeUser());

    passport.use(new googlestrategy(
        {
            clientID:config.google.clientId,
            clientSecret:config.google.clientSecret,
            callbackURL: "https://localhost:3000/auth/google/secrets",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },function(accessToken, refreshToken, profile, cb) 
        {
            console.log(profile);
        
            personmodel.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
      }
    ));
const h_router = require("../oauth/routers/home");
app.use('/',h_router);
const r_router = require("../oauth/routers/register");
app.use('/register',r_router);
const l_router = require("../oauth/routers/login");
app.use('/login',l_router);

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });
app.listen('3000', () => {console.log("Server Running At Port : 3000")});

module.exports = app;
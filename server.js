var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var app = express();

// load environment variables located in .env file
require('dotenv').config();

// connect mongodb
mongoose.connect(process.env.MONGODB_URI + '/booktradingclub');

// configuration
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// serve public folder as static.
app.use(express.static(path.join(__dirname, 'public')));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes
app.get('/', function (req, res) {
  res.render('index');
});

// create an user randomly.
app.get('/setup', (req, res) => {

  const newUser = new User({
    name: 'test',
    password: 'password',
    admin: true
  });

  newUser.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({success: true});
  });

});

// route authentification
app.post('/api/authenticate', (req, res) => {
  User.findOne({name: req.body.name}, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'User not found'});
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({success: false, message: 'Wrong password'});
      } else {

        // if user is found and password is right
        // create a token
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24 // expries in 24 hours
        });

        // return the information including token as json
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
  });
});

// route middleware to verify token.
// Order is important here as we don't want to verify /api/authenticate.
app.use('/api/*', (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({success: false, message: 'Failed ot authenticate token.'});
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  }
  res.status(403).send({
    success: false,
    message: 'No token provided'
  })
});

// return all users.
app.post('/api/user', (req, res) => {
  res.json(req.decoded);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

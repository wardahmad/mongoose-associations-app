const express = require('express');
const app = express();
var Food = require('./models/food');
var Ingredient = require('./models/ingredient');
var User = require('./models/user').User
var Tweet = require('./models/user').Tweet

app.use(express.json())

const mongoos = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/mongoRelationships';

mongoos.connect(mongoURI, {useNewUrlParser: true}, () => {
    console.log('the connection with mongod is established')
});

app.listen(3000, () => {
    console.log("I am listining")
});

// send all information for all foods
app.get('/api/foods/', (req, res) => {
    Food.find({ })
      .populate('ingredients')
      .exec((err, foods) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        console.log(`found and populated all foods: ${foods}`);
        res.json(foods);
      });
  });

  app.post('/api/users', (req, res) => {
    User.create(req.body, (error, newUser) => {
      res.json(newUser);
    })
  })

  // create tweet embedded in user
app.post('/api/users/:userId/tweets', (req, res) => {
    // store new tweet in memory with data from request body
    var newTweet = new Tweet({ tweetText: req.body.tweetText });
  
    // find user in db by id and add new tweet
    User.findById(req.params.userId, (error, foundUser) => {
      foundUser.tweets.push(newTweet);
      foundUser.save((err, savedUser) => {
        res.json(newTweet);
      });
    });
  });


  // update tweet embedded in user
app.put('/api/users/:userId/tweets/:id', (req, res) => {
    // set the value of the user and tweet ids
    var userId = req.params.userId;
    var tweetId = req.params.id;
  
    // find user in db by id
    User.findById(userId, (err, foundUser) => {
      // find tweet embedded in user
      var foundTweet = foundUser.tweets.id(tweetId);
      // update tweet text and completed with data from request body
      foundTweet.tweetText = req.body.tweetText;
      foundUser.save((err, savedUser) => {
        res.json(foundTweet);
      });
    });
  });


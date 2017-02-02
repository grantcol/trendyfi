var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var reqwest = require('reqwest');
var session = require('express-session');
var moment = require('moment');
var User = require('./models/User.js');
var Post = require('./models/Post.js');
var Voter = require('./models/Voter.js');
var app = express();
var router = express.Router();
var db = mongoose.connect(process.env.DB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/** ROUTER **/

router.use(function(req, res, next) {
    // do logging
    console.log(moment().format('YYYY-MM-DD'), "recieved request");
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/posts')

    .get(function(req, res) {
      var payload = Post.find().sort({createdAt: 'desc'}).limit(10);
      payload.exec(function(err, posts) {
         if (err)
             res.send(err);
         res.json(posts);
       });
    })

    .post(function(req, res) {
      console.log('something submitted as a post', req.body)
      var post = createPost(req.body.data);
      post.save(function(err) {
        if(err) { res.status(500).send({ error : err });}
        else {
          res.status(200).send(post);
        }
      });
    })

router.route('/posts/:post_id')
    .get(function(req, res) {
      Post.findById(req.params.post_id, function(err, song) {
            if (err)
                res.send(err);
            res.json(song);
        });
    })
   .delete(function(req, res) {
        Song.remove({
            _id: req.params.post_id
        }, function(err, song) {
            if (err)
              res.send(err);
            res.json({ message: 'Post successfully deleted' });
        });
    })

router.route('/users')

    .get(function(req, res) {
      var payload = User.find().sort({createdAt: 'desc'}).limit(10);
      payload.exec(function(err, users) {
         if (err)
             res.send(err);
         res.json(users);
       });
    })

router.route('/users/:user_id')

    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

   .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message : 'User successfully deleted' });
        });
    })
router.route('/vote')
  .post(function(req, res){
    Post.findById(req.body.post_id, function (err, post){
      if(err){
        console.log('error!');
        res.status(500).send(error);
      }

      User.findById(req.body.user_id, function(err, user){
        console.log(post, user);
        var v = new Voter({
          _creator: post._id,
          user: user
        });
        v.save(function(err){
          if(err) console.log("couldn't create a voter");
          else res.status(200).send(post);
        });
      });
    });
  })

router.route('/auth')
  .post(function(req, res){
    User.findOrCreate({username: req.body.username}, {password: req.body.password}, function(err, user) {
      if(err){
        res.status(404);
      } else {
        console.log('authenticated the user!');
        res.status(200).send(user);
      }
    })
  })

router.get('/', function(req, res) {
    res.json({ message: 'waves are crashing all around you will you shred or sink?' });
});


app.use('/api', router);

function createPost(data) {
    var post = new Post();
    post.location = data.location;
    post.price = data.price;
    post.user = 1;
    post.title = data.title;
    return post;
}

app.listen(8888, function () {
  console.log('trendyfi listening on port 8888!');
});

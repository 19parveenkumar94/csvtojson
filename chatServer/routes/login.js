var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
 router.get('/', function(req, res, next) {
   res.render('login');
 });

//
// router.get("/login",  passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: "invalid username or password" })
// );
// router.get('/users/:userId/books/:bookId', function(req, res) {
//   res.send(req.params);
// });
// router.get("/index",function(req,res,next){
//   res.send('./public/html/index.html');
// });


router.get('/chat', function(req, res, next) {
  res.render('chatClient');
});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/chat');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;

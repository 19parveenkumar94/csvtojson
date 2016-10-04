var express = require('express');
var router = express.Router();
var users = require('../models/user');
var auth = require("../auth.js")();
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get("/upload",function(req,res,next){

  res.render('serverUpload');

});

router.get("/",function(req,res,next){

  res.render('dummy');

});
router.get("/login",auth.authenticate(),function(req,res,next){
  res.render("loginActual");

});
router.get("/register",function(req,res,next){
  res.render("register");

});
router.get("/checkLogin",function(req,res,next){
  res.render("selectUsers");
});
// router.post("/checkLogin",function(req,res,next){
//   //console.log('name'+req.body.username+' password'+ req.body.password);
//
//   users.findOne({ username: req.body.username,password: req.body.password},function (err, users) {
//      if ((users==null)||(err)) {
//        res.redirect('/login');
//      }
//
//      res.render("dummy");
//    });
//
// });
router.post("/registerUser",function(req,res){
  console.log("inside server");
var login=new users({username:req.body.username,password:req.body.password,email:req.body.email});
users.findOne({email:req.body.email},function(err,users){
  if(users)
  {
    console.log('here');
    //res.status(200);
    res.redirect('/register');
  }
  else{
    login.save(function(err){
    if(err)
    return console.error(err);
    //res.status(400);
    res.redirect("/login");

    });

  }

});

});


router.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});
router.get("/index",function(req,res,next){
  res.render('./public/html/index.html');
});

router.all('/secret',function(req,res,next){
  console.log("inside secret");

});
module.exports = router;

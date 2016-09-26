var express = require('express');
var router = express.Router();

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
router.get("/",function(req,res,next){

  res.render('chatClient');

});
router.get("/mogambo",function(req,res,next){
  res.send("mogambo khush hua");

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

var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require("./models/user.js");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
secretOrKey: 'secret',
jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
var strategy = new Strategy(params, function(payload, done) {
var user = users.findOne({email:payload.email},function(err,user){
  if (user) {
  return done(null, {email: user.email});
  } else {
  return done(new Error("User not found"), null);
  }

});
});
passport.use(strategy);
return {
initialize: function() {
return passport.initialize();
},
authenticate: function() {
return passport.authenticate("jwt", {session:false});
}
};
};

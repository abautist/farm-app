var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

module.exports = {
	localStrategy: new LocalStrategy({
		usernameField: "email"
	},
	function(email, password, done) {
    db.user.find({where: {email: email}}).then(function(user) {
      if (user) {
        user.checkPassword(password, function(err, result) {
          if (err) return done(err);
          if (result) {
            done(null, user.get());
          } else {
            done(null, false, {message: "invalid password"});
          }
        });
      } else {
        done(null, false, {message: "unknown user"});
      }
    });
  }),
  serializeUser: function(user, done) {
    done(null, user.id);
  },
  deserializeUser: function(id, done) {
    db.user.findById(id).then(function(user) {
      done(null, user.get());
    }).catch(done);
  }
}


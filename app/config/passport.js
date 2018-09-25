var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy( function(username, password, done) {
	//Encuentro usuario con el username provisto
	User.findOne({ username : username }, function (err, user) {
	  if (err) { return done(err); }
	  // Si no se encuentra usuario
	  if (!user) {
		return done(null, false, {
		  message: 'Usuario no encontrado'
		});
	  }
	  // Si la contraseña es incorrecta (chequeo con validPassword)
	  if (!user.validPassword(password)) {
		return done(null, false, {
		  message: 'Contraseña incorrecta'
		});
	  }
	  // Si las credenciales son correctas se retorna el objeto usuario
	  return done(null, user);
	});
  }
));
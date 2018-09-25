var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
//Borrar después de crear usuario
var admin = require('../config/admin.json');


//Registro
module.exports.register = function(req, res) {
  var user = new User();

  user.username = admin.username;

  user.setPassword(admin.passwd);

  user.save(function(err) {
	var token;
	token = user.generateJwt();
	res.status(200);
	res.json({
	  "token" : token
	});
  });
};


//Login
module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
	var token;

	// Si passport detecta error
	if (err) {
	  res.status(404).json(err);
	  return;
	}

	// Si el ususario es encontrado
	if(user){
	  token = user.generateJwt();
	  res.status(200);
	  res.json({
		"token" : token
	  });
	} else {
	  // Si el usuario no se encuentra
	  res.status(401).json(info);
	}
  })(req, res);

};
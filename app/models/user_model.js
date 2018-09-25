var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config.json');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hash: String, //El hash es creado combinando la contraseña que ingresa el usuario con el salt
	salt: String //Cadena de caracteres único para cada user
});

//Set Password
userSchema.methods.setPassword = function(password){
	//Esta función "setea" la contraseña, crea el hash y el salt y se ejecuta sólo al registrarse
	//Creamos salt único usando función randomBytes de crypto
	this.salt = crypto.randomBytes(16).toString('hex');
	//Creamos hash usando función pbkdf2Sync de crypto combinando salt y password ingresada
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};


//Check Password
userSchema.methods.validPassword = function(password){
	//Crea un hash con la contraseña ingresada, retorna true si coincide con el hash creado al registrarse
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
};


//Generar JsonWebToken
userSchema.methods.generateJwt = function() {
	//Jwt requiere una fecha de expiración
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	//Generamos el jwt y lo retornamos
	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000),
	}, config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);

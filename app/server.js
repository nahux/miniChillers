var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Chiller = require('./chiller_model');
//Datos mock
//var mock = require('./mock');

var app = express();

//Conexión base de datos
const db_url = 'mongodb+srv://nahuel94:wJ2sV_cENfBbGP4@cluster0-8jyou.mongodb.net/mini_chillers?retryWrites=true';
mongoose.connect(db_url, { useNewUrlParser: true }, function (err) {
	if (err) throw err;
	console.log('Successfully connected');
});


//Config
//Ubicación archivos estáticos (frontend)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 9229;
app.listen(PORT, function(){
	console.log(`Escuchando en ${PORT}`);
})


//REST 
app.get('/api/chillers', function(req,res){
	Chiller.find(function(err,chillers) {
		if(err){
			console.log(err);
			res.send(err);
		}
		res.json(chillers);
	});
});

app.get('/api/chillers/:chiller', function(req,res){
	Chiller.findById(req.params.chiller,function(err,chiller){
		if(err){
			console.log(err);
		}
		res.json(chiller);
	})
})

//Llamado a angular
app.use(express.static('../public'));
var express = require('express');
var bodyParser = require('body-parser');
//Datos mock
var mock = require('./mock');

var app = express();

//var mongoose = require('mongoose');

//Conexión base de datos
//mongoose.connect('mongodb://localhost:4444/mini_chillers');


//Config
//Ubicación archivos estáticos (frontend)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(9229, function(){
	console.log('Escuchando en 9229');
})

app.get('/api/chillers', function(req,res){
	res.json(mock.chillers);
});

app.get('/api/chillers/:chiller', function(req,res){
	res.json(mock.chillers.find(x => x.id == req.params.chiller))
})

app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});
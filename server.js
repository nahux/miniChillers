var express = require('express');

var app = express();

//var mongoose = require('mongoose');

//Conexión base de datos
//mongoose.connect('mongodb://localhost:4444/mini_chillers');

//Config
app.configure(function() {
	//Ubicación archivos estáticos (frontend)
	app.use(express.static(__dirname + '/public'));
	//Log de requests en consola
	app.use(express.logger('dev'));
	//Cambiar el HTML con POST
	app.use(express.bodyParser());
	//Simula DELETE y PUT
	app.use(express.methodOverride());
});

app.listen(8080, function(){
	console.log('Escuchando en 8080');
})

app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});
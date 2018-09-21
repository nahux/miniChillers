//App
var app = angular.module("mini_chillers", ['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: '../view/catalogo.html',
		controller: 'catalogoController'
	})
	.when("/item/:ID", {
		templateUrl: '../view/item.html',
		controller: 'itemController'
	})
	.when("/contacto", {
		templateUrl: '../view/contacto.html',
		controller: 'contactoController'
	})
	.otherwise({
			redirectTo: '/'})
})

app.controller('catalogoController', function($scope,$http) {
	 $http({
			method: 'GET',
			url: 'api/chillers'
		}).then(function(data) {
			$scope.chillers = data.data;
		},function(data) {
			console.log('Error: ' + data);
		});

	$scope.title = 'CHILLERS';
	$scope.desc = 'Los mini chillers Comfort Center son unidades enfriadoras de líquido, con condensador enfriado por aire y serpentín de aluminio. Compresor hermético Scroll. Intercambiador de calor por inundación, también disponible del tipo de casco-tubo e intercambiador de placas. Control electrónico digital, válvula de expansión termostática, tanque de almacenamiento de líquido aislado térmicamente , bomba centrífuga y ruedas de desplazamiento.';
})

app.controller('itemController', function($scope, $routeParams, $http) {
	 $http({
			method: 'GET',
			url: 'api/chillers/'+$routeParams.ID
		}).then(function(data) {
			$scope.chiller = data.data;
		},function(data) {
			console.log('Error: ' + data);
		});
})

app.controller('contactoController', function($scope) {

})
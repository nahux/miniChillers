//App
var app = angular.module("mini_chillers", ['ngRoute']);
//Datos Mock
var chi1 = {
	id   : 1,
	name : 'MOD. CCCH024/CCCH30',
	img  : 'images/mc1.jpg',
	desc : 'Mini chiller para refrigerar lo que desee.',
	precio : '$150000',
	specs : {
		cap_enfri1 : ["T.R",2.0,2.5],
		cap_enfri2 : ["BTU/H",24000,30000],
		motor_comp : ["Hp","1/4","1/2"],
		motor_bomb : ["Hp",2.9,3.6],
		tipo_refri : [" ","R410A","R410A"],
		max_flu_re : ["1/Min.", 48.9, 61.1],
		diam_tub   : ["IN", "1", "1"],
		motor_vent : ["Hp", ".26", ".32"],
		cap_tanque : ["L.", "40", "60"],
		dimension  : ["Cm", "85x30x128", "90x32x142"],
		voltaje    : ["V./P./Hz.", "220/1/60", "220/1/60"],
		peso	   : ["Kg.", 95 ,128]
	}
};

var chi2 = {
	id   : 2,
	name : 'MOD. CCCH036/CCCH060',
	img  : 'images/mod1.jpeg',
	desc : 'Mini chiller para refrigerar lo que desee.',
	precio : '$220000'
}

var chillers = [chi1,chi2];

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

app.controller('catalogoController', function($scope) {
	$scope.title = 'CHILLERS';
	$scope.desc = 'Los mini chillers Comfort Center son unidades enfriadoras de líquido, con condensador enfriado por aire y serpentín de aluminio. Compresor hermético Scroll. Intercambiador de calor por inundación, también disponible del tipo de casco-tubo e intercambiador de placas. Control electrónico digital, válvula de expansión termostática, tanque de almacenamiento de líquido aislado térmicamente , bomba centrífuga y ruedas de desplazamiento.';

	$scope.chillers = chillers;
})

app.controller('itemController', function($scope, $routeParams) {
    $scope.ID = $routeParams.ID;

    $scope.chiller = chillers.find(x => x.id == $routeParams.ID)
})

app.controller('contactoController', function($scope) {

})
//App
var app = angular.module("mini_chillers", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: '../view/catalogo.html'
	})
	.when("/item", {
		templateUrl: '../view/item.html'})
})	
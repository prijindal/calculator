angular.module('calculator', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl:'templates/basic.html',
        controller:'basicController as app'
    })
    .when('/scientific', {
        templateUrl:'templates/scientific.html',
        controller:'scientificController as app'
    })
}])

.controller('mainController', ['ipc', function(ipc) {
    var self = this;
    self.close = ipc.closeWindow
}])

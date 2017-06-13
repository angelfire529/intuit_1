angular.module('app', ['ui.router', 'ui.bootstrap'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'html/home/home.html',
    };

    var contacts = {
        name: 'contacts',
        url: '/contacts',
        templateUrl: 'html/contacts/contacts.html',
        controller: 'contactsCtrl'
    };

    $stateProvider
    .state(home)
    .state(contacts);
}]);
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
angular.module('app').controller('contactsCtrl', function ($scope, $uibModal, contactsService) {
    var vm = this;

    vm.contacts = [];

    vm.init = function () {
        contactsService.GetContacts().then(function (data) {
            vm.contacts = data.data.contacts;
        });
    };

    vm.showDetails = function (index) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'details.html',
            controller: function ($scope, items) {
                $scope.items = items;
                $scope.getEmails = function (index) {
                    return $scope.items[index].email;
                };
                $scope.getPhones = function (index) {
                    return $scoep.items[index].phone;
                }
            },
            size: 'md',
            resolve: {
                items: function () {
                    return vm.contacts[index].details;
                }
            }
        });
    };

    vm.showEmContacts = function (index) {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'emergency-contacts.html',
            controller: function ($scope, items) {
                $scope.items = items;
            },
            size: 'md',
            resolve: {
                items: function () {
                    return vm.contacts[index].emergencyContacts;
                }
            }
        });
    };
});
angular.module('app').factory('contactsService', function ($http, $q) {
    var service = {
        GetContacts: GetContacts
    };

    function GetContacts() {
        return $http.get('data.json')
        .success(function (data, status, headers, config) {
            console.log('success!!! ' + JSON.stringify(data));

        })
        .error(function (data, status, headers, config) {
            console.log('there was an error:  ' + JSON.stringify(data));
        });
    }

    return service;
});
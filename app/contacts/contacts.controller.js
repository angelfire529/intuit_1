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
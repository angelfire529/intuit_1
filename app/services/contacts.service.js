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
/**
 * Created by HUYQTA on 2/6/2015.
 */
'use strict';

var myApp = angular.module("AppEntertaiment");

myApp.controller("IndexController", ['$scope', 'dataFactory', function ($scope, dataFactory) {
    $scope.channel_groups;
    $scope.channels;
    $scope.programs_on_air;
    $scope.programs_up_next;
    $scope.status;
    $scope.program_by_channel;

    dataFactory.getAllChannelGroups().then(function (data) {
        $scope.channel_groups = data;
    });

    dataFactory.getAllChannels().then(function (data) {
        $scope.channels = data;
    });

    dataFactory.getProgramsOnAir().then(function (data) {
        $scope.programs_on_air = data;
    });

    dataFactory.getProgramsUpNext().then(function (data) {
        $scope.programs_up_next = data;
    });

    dataFactory.getProgramsByChannel().then(function (data) {
        $scope.program_by_channel = data;
    });
}])

myApp.factory("dataFactory", ['$http', function ($http, $filter) {

    var dataFactory = {};
    var now = new Date();

    dataFactory.getAllChannelGroups = function () {
        return $http.get("http://huyqta.esy.es/index.php/api/groups/GetAllGroups/format/json").then(function (data) {
//            console.log($filter('date')(new Date(), 'yyyy-MM-dd'));
            return data.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    dataFactory.getAllChannels = function () {
        return $http.get("http://huyqta.esy.es/index.php/api/channels/GetAllChannels/format/json").then(function (data) {
            return data.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    dataFactory.getProgramsOnAir = function () {
        return $http.get("http://huyqta.esy.es/index.php/api/programs/GetProgramsOnAir/2015-02-02/6:00/format/json").then(function (data) {
            return data.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    dataFactory.getProgramsUpNext = function () {
        return $http.get("http://huyqta.esy.es/index.php/api/programs/GetNextPrograms/2015-02-02/6:00/1/0/format/json").then(function (data) {
            return data.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    dataFactory.getProgramsByChannel = function(){
        return $http.get("http://huyqta.esy.es/index.php/api/programs/GetProgramsByChannel/2015-02-02/6:00/1/0/format/json").then(function (data) {
            return data.data;
        }, function (error) {
            console.log(error);
            return [];
        });
    }

    return dataFactory;
}]);

/////// --- FILTERS ---
myApp.filter("contains", function () {
    return function (input, options) {
        input = input || "";
        var sourcefield = options["sourcefield"];
        var targetfield = options["targetfield"];
        var returnfield = options["returnfield"];
        if (sourcefield == targetfield) {
            return input[returnfield];
        }
    }
}).filter("containid", function () {
    return function (input, options) {
        input = input || "";
        var result = [];
        var targetvalue = options["targetvalue"];
        for (var i = 0; i < input.length; i++) {
            if (input[i].refgroup == targetvalue) {
                result.push(input[i])
            }
        }
        return result;
    }
});

/////// --- DIRECTIVES ---
myApp.directive("myGroupChannels", ['dataFactory', function (dataFactory) {
    var getChannel = function (scope, element, attributes) {
        scope.test = attributes["group"];
        scope.channels;
        dataFactory.getAllChannels().then(function (data) {
            scope.channels = data;
        })
    };

    return {
        restrict: "E",
        template: "<p>{{scope.channels}}<p>",
        link: getChannel
    };
}]);
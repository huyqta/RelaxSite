/**
 * Created by SMOOVPOS on 2/27/2015.
 */

'use strict';

myApp.controller("tiviController", ["$scope", "$stateParams", "tiviFactory", function($scope, $stateParams, tiviFactory){
    $scope.channel_id = $stateParams.cid;
    $scope.stream_url = "N/A";

    tiviFactory.getChannelStreamUrl($scope.channel_id).then(function (data) {
        $scope.stream_url = data;
    });
}]);

myApp.factory("tiviFactory", ['$http', function ($http) {
    var tiviFactory = {};

    tiviFactory.getChannelStreamUrl = function(channel_id){
        return $http.post("http://128.199.167.236:5000/apis/getstreamfromhttp", { 'url': channel_id } ).then(function (data) {
            return data.data;
        }, function (error) {
            console.log(error);
            return channel_id;
        });
    }

    return tiviFactory;
}]);
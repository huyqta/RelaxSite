/**
 * Created by HUYQTA on 1/27/2015.
 */
'use strict';

var myApp = angular.module("AppEntertaiment", ['ui.router']);

myApp.directive('myHeader', function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/header.html'
    }
}).directive('myPrograms', function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/tivi.programs.html'
    }
}).directive('myChannels', function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/tivi.channels.html'
    }
})
myApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/index');

    $stateProvider
        .state('tivi', {
            url: 'tivi',
            templateUrl: 'templates/tivi/index.html'
        })
        .state('index',{
            url: '/index',
            templateUrl: 'templates/movie/index.html'
        })
        .state('movie',{
            url: '/movie',
            templateUrl: 'templates/movie/index.html'
        })
        .state('music',{
            url: '/music',
            templateUrl: 'templates/music/index.html'
        })
        .state('radio',{
            url: '/radio',
            templateUrl: 'templates/radio/index.html'
        })
        .state('play_video', {
            url: '/play_video',
            templateUrl: 'templates/play_video.html'
        });
})
/**
 * Created by HUYQTA on 1/27/2015.
 */
'use strict';

var myApp = angular.module("AppEntertaiment", ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/index');

    $stateProvider
        .state('index',{
            url: '/index',
            templateUrl: 'views/home.html'
        })

        .state('index.play_video', {
            url: '/play_video',
            templateUrl: 'views/play_video.html'
        })
})
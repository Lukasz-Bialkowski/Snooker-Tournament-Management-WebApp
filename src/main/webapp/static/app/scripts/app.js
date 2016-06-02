'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
 angular.module('mainApp', ['ui.router', 'myApp.filters','myApp.directives', 'myApp.services', 'myApp.controllers'])
  .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/scores');
      $stateProvider
        .state('scores', {
          url : '/scores',
          templateUrl : 'views/scores.tmpl.html',
          controller : 'ScoresCtrl'
      }).state('tournaments', {
          url : '/tournaments',
          templateUrl : 'views/tournaments.tmpl.html',
          controller : 'TournamentsCtrl'
      }).state('matches', {
          url : '/:tournamentId/matches',
          templateUrl : 'views/matches.tmpl.html',
          controller : 'MatchesCtrl'
      }).state('frames', {
          url : '/:tournamentId/matches/:matchId/frames',
          templateUrl : 'views/frames.tmpl.html',
          controller : 'FrameCtrl'
      }).state('players', {
          url : '/players',
          templateUrl : 'views/players.tmpl.html',
          controller : 'PlayersCtrl'
      }).state('query', {
          url : '/query',
          templateUrl : 'views/query.tmpl.html',
          controller : 'QueryCtrl'
      });

  });

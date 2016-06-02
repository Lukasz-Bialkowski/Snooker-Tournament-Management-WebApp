'use strict';
angular.module('myApp.controllers')
.controller('ScoresCtrl',['$scope', 'tournamentHTTPSrv','scoresHTTPSrv','$stateParams','$state','playerHTTPSrv','matchHTTPSrv',
        function ($scope, tournamentHTTPSrv,scoresHTTPSrv,$stateParams,$state,playerHTTPSrv,matchHTTPSrv) {

        $scope.players = [];
        $scope.tournamentPlayers = [];
        $scope.tournamentMatches = [];
        $scope.tournaments = [];
        $scope.currentTournament;

        tournamentHTTPSrv.list({}, function(response){
          $scope.tournaments = response;
        });

        playerHTTPSrv.list({}, function(response){
          $scope.players = response;
        })

        $scope.getTournamentPlayers = function() {
          playerHTTPSrv.tournamentPlayers({tournamentId : $scope.currentTournament.id}, function(response){
            $scope.tournamentPlayers = response;
          })
        };

        $scope.getTournamentMatches = function() {
            matchHTTPSrv.tournamentMatches({tournamentId : $scope.currentTournament.id}, function(response){
              $scope.tournamentMatches = response;
            });
        };

        $scope.addMatch = function() {
          $state.go("matches", {tournamentId : $scope.currentTournament.id});
        };

        $scope.addScore = function(matchRowId) {
          $state.go("frames", {tournamentId : $scope.currentTournament.id, matchId: matchRowId });
        };

        $scope.savePlayer = function(item) {
          playerHTTPSrv.save(item, function(response){
            $scope.current=response;
            $scope.getTournamentMatches();
          })
        };

        $scope.saveMatch = function(item) {
          matchHTTPSrv.save({tournamentId  : $scope.currentTournament.id}, item, function(response){
            $scope.current=response;
            $scope.getTournamentPlayers();
          })
        };

        $scope.removeMatch = function(item) {
          matchHTTPSrv.remove({tournamentId : $scope.currentTournament.id, subresourceId : item.id}, function(response){
            $scope.getTournamentPlayers();
            $scope.getTournamentMatches();
          })
        };


}]);

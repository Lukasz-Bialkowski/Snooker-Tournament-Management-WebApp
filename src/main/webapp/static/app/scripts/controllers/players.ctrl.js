'use strict';
angular.module('myApp.controllers')
.controller('PlayersCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv',
        function ($scope, tournamentHTTPSrv,$stateParams,$state,playerHTTPSrv) {

        $scope.current = {};
        $scope.allPlayers = [];

        playerHTTPSrv.create({}, function(response) {
            $scope.current = response;
        });

        $scope.getPlayers = function() {
          playerHTTPSrv.list({}, function(response) {
              $scope.allPlayers = response;
          });
        };

        $scope.getPlayers();

        $scope.save = function(item) {
          playerHTTPSrv.save(item, function(response){
            $scope.current=response;
            $("#saveModal").modal();
            $scope.getPlayers();
          })
        };

        $scope.remove = function(item) {
          playerHTTPSrv.remove({playerId : item.id}, function(response){
            alert("Usunieto gracza.");
            $scope.create();
            $scope.getPlayers();
          }, function(error){
            alert("Nie mozna usunąc gracza. Gracz dodany do meczu.");
          })
        };

        $scope.create = function() {
          playerHTTPSrv.create({}, function(response) {
            $scope.current = response;
          });
        };

}]);

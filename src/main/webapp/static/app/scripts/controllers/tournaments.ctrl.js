'use strict';
angular.module('myApp.controllers')
.controller('TournamentsCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state',
        function ($scope, tournamentHTTPSrv,$stateParams,$state) {
        $scope.current = {};
        $scope.allTournaments = [];

        tournamentHTTPSrv.create({}, function(response) {
            $scope.current = response;
        });

        $scope.getAllTournaments = function() {
            tournamentHTTPSrv.list({}, function(response) {
               $scope.allTournaments = response;
            });
        };

        $scope.getAllTournaments();

        $scope.save = function(item) {
          tournamentHTTPSrv.save(item, function(response){
            $scope.current=response;
            $("#saveModal").modal();
            $scope.getAllTournaments();
          })
        };

        $scope.remove = function(item) {
          tournamentHTTPSrv.remove({tournamentId : item.id}, function(response){
            $scope.create();
          })
        };

        $scope.create = function() {
          tournamentHTTPSrv.create({}, function(response) {
            $scope.current = response;
          });
        };

}]);

'use strict';
angular.module('myApp.controllers')
.controller('QueryCtrl',['$scope', '$stateParams','$state','tournamentHTTPSrv', function ($scope, $stateParams,$state,tournamentHTTPSrv) {

      $scope.queryTournaments =[];
      $scope.searchedRecently = false;

      $scope.query = function(queryYear) {
          tournamentHTTPSrv.tournament({year : queryYear}, function(response){
            $scope.queryTournaments = response;
            $scope.searchedRecently = true;
          });
      };

}]);

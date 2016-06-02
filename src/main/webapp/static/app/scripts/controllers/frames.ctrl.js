'use strict';
angular.module('myApp.controllers')
.controller('FrameCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv','frameHTTPSrv',
        function ($scope, tournamentHTTPSrv,$stateParams,$state,playerHTTPSrv,frameHTTPSrv) {

        $scope.matchFrames = [];
        $scope.FRAMES_IN_MATCH = 12;
        $scope.firstPlayerScore =0;
        $scope.secondPlayerScore =0;

        $scope.saveFrame = function(index) {
          frameHTTPSrv.save({tournamentId : $stateParams.tournamentId, matchId: $stateParams.matchId}, $scope.matchFrames[index], function(response){
            $scope.matchFrames[index] = response;
            $("#saveModal").modal();
          });
        };

        $scope.saveFrames = function() {
          frameHTTPSrv.saveFrames({tournamentId : $stateParams.tournamentId, matchId: $stateParams.matchId}, $scope.matchFrames, function(response){
            $scope.matchFrames=response;
            $("#saveModal").modal();
          });
        };

        $scope.create = function() {
          frameHTTPSrv.listFrames({tournamentId : $stateParams.tournamentId, matchId: $stateParams.matchId}, function(response) {
            $scope.matchFrames = response;
            $scope.countPoints();
          });
        };

        $scope.create();

        $scope.countPoints = function(){
          $scope.firstPlayerScore =0;
          $scope.secondPlayerScore =0;
          for (var i = 0; i < $scope.matchFrames.length; i++) {
              $scope.firstPlayerScore += parseInt($scope.matchFrames[i].firstPlayerScore);
              $scope.secondPlayerScore += parseInt($scope.matchFrames[i].secondPlayerScore);
          }
        };


}]);

'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
 angular.module('mainApp', ['ngResource','ui.router'])
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

  }).factory('tournamentHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:operation/:tournamentId', {}, {
          list : {
            method : 'GET',
            isArray : true
          },
          get : {
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  operation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  operation : 'save'
              }
          },
          remove : {
              method : 'DELETE'
          },
          tournament : {
            method : 'GET',
            params : {
                operation : 'tournament'
            },
            isArray : true
          }

      });
      return res;

}).factory('scoresHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:operation/:tournamentId/:subresource/:suboperation/:subresourceId', {}, {

          listMatches : {
              method : 'GET',
              params : {
                subresource : 'matches'
              },
              isArray : true
          },
          getMatch : {
              params : {
                subresource : 'matches'
              },
              method : 'GET'
          },
          saveMatch : {
              params : {
                subresource : 'matches',
                suboperation : 'save'
              },
              method : 'POST'
          },
          deleteMatch : {
              params : {
                subresource : 'matches'
              },
              method : 'DELETE'
          }

      });
      return res;

}).factory('playerHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/players/:operation/:playerId', {}, {
          list : {
              method : 'GET',
              isArray : true
          },
          tournamentPlayers: {
              method : 'GET',
              params: {
                operation : 'tournament'
              },
              isArray : true
          },
          get : {
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  operation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  operation : 'save'
              }
          },
          remove : {
              method : 'DELETE'
          }

      });
      return res;

}).factory('matchHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:tournamentId/:subresource/:suboperation/:subresourceId', {}, {
          list : {
              method : 'GET',
              params : {
                subresource : 'matches'
              },
              isArray : true
          },
          get : {
              params : {
                subresource : 'matches'
              },
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  subresource : 'matches',
                  suboperation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  subresource : 'matches',
                  suboperation : 'save'
              }
          },
          remove : {
              params : {
                subresource : 'matches'
              },
              method : 'DELETE'
          },
          tournamentMatches : {
              method : 'GET',
              params : {
                subresource : 'matches',
                suboperation : 'tournamentMatches'
              },
              isArray : true
          }

      });
      return res;

}).factory('frameHTTPSrv', function($resource){

      var res = $resource('http://localhost:8080/snooker-competition-chart/tournaments/:tournamentId/matches/:matchId/:subresource/:suboperation/:subresourceId', {}, {
          list : {
              method : 'GET',
              params : {
                subresource : 'frames'
              },
              isArray : true
          },
          get : {
              params : {
                subresource : 'frames'
              },
              method : 'GET'
          },
          create : {
              method : 'GET',
              params : {
                  subresource : 'frames',
                  suboperation : 'create'
              }
          },
          save : {
              method : 'POST',
              params : {
                  subresource : 'frames',
                  suboperation : 'save'
              }
          },
          saveFrames: {
              method : 'POST',
              params : {
                  subresource : 'frames',
                  suboperation : 'saveFrames'
              },
              isArray : true
          },
          remove : {
              params : {
                subresource : 'frames'
              },
              method : 'DELETE'
          },
          listFrames: {
              method : 'GET',
              params : {
                subresource : 'frames',
                suboperation : 'listFrames'
              },
              isArray : true
          }

      });
      return res;

}).controller('ScoresCtrl',['$scope', 'tournamentHTTPSrv','scoresHTTPSrv','$stateParams','$state','playerHTTPSrv','matchHTTPSrv',
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


}]).controller('TournamentsCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state',
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

}]).controller('PlayersCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv',
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

}]).controller('MatchesCtrl',['$scope', '$stateParams','$state','matchHTTPSrv','playerHTTPSrv','tournamentHTTPSrv',
        function ($scope, $stateParams,$state,matchHTTPSrv,playerHTTPSrv,tournamentHTTPSrv) {

        $scope.current = {};
        $scope.players = [];
        $scope.currentTournament = {};
        $scope.tournamentMatches = [];

        matchHTTPSrv.create({tournamentId : $stateParams.tournamentId}, function(response) {
            $scope.current = response;
        });

        $scope.getTournamentMatches = function() {
            matchHTTPSrv.tournamentMatches({tournamentId : $stateParams.tournamentId}, function(response){
              $scope.tournamentMatches = response;
            });
        };

        $scope.getTournamentMatches();

        playerHTTPSrv.list({}, function(response){
          $scope.players = response;
        });

        tournamentHTTPSrv.get({tournamentId : $stateParams.tournamentId}, function(response){
          $scope.currentTournament = response;
        });

        $scope.save = function(item) {
          matchHTTPSrv.save({tournamentId : $stateParams.tournamentId}, item, function(response){
            $scope.current=response;
            $("#saveModal").modal();
            $scope.getTournamentMatches();
          })
        };

        $scope.remove = function(item) {
          matchHTTPSrv.remove({tournamentId : $stateParams.tournamentId, subresourceId : item.id}, function(response){
            $scope.create();
          })
        };

        $scope.create = function() {
          matchHTTPSrv.create({tournamentId : $stateParams.tournamentId}, function(response) {
            $scope.current = response;
          });
        };

}]).controller('FrameCtrl',['$scope', 'tournamentHTTPSrv','$stateParams','$state','playerHTTPSrv','frameHTTPSrv',
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
        $scope.countPoints();

}]).controller('QueryCtrl',['$scope', '$stateParams','$state','tournamentHTTPSrv', function ($scope, $stateParams,$state,tournamentHTTPSrv) {

      $scope.queryTournaments =[];
      $scope.searchedRecently = false;

      $scope.query = function(queryYear) {
          tournamentHTTPSrv.tournament({year : queryYear}, function(response){
            $scope.queryTournaments = response;
            $scope.searchedRecently = true;
          });
      };

}]).filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});

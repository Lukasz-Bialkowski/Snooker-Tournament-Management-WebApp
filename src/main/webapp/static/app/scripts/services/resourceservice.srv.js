'use strict';
angular.module('myApp.services', ['ngResource'])
.factory('tournamentHTTPSrv', function($resource){

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

});

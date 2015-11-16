'use strict';

angular.module('myApp', []) //declare my application as myApp
//Declare the controller that I will be working with - pass the services which I will be using
  .controller('searchController', function($scope, $http) { 
    var pendingTask;

    //If the model is blank then populate
    if($scope.search === undefined){
      $scope.search = "Wimbledon";
      fetch();
    }

    //Listen on change 
    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      //TImeout to 800ms to avoid too many requests
      pendingTask = setTimeout(fetch, 800);
    };

  });
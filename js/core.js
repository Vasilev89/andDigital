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

    //Get response from server  
    function fetch(){
      $http.get("https://api.foursquare.com/v2/venues/explore?near="+ $scope.search + "&oauth_token=RUKQBYL4EFOKY1FJ3CS0K5FX4JKP0LBP5UQH1YAJAM0YQJKE&v=20151115")
       .success(function(response){ 
        console.log(response.response.groups[0].items);
  
        $scope.details = response.response; 
        

       });

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
       .success(function(response){  $scope.related = response; });
    }

    $scope.update = function(movie){
      $scope.search = movie.Title;
      $scope.change();
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }

  });
(function(angular) {
  "use strict";

  var app = angular.module("app", []);

  app.controller("TarMang", ["$scope", "$http", function TarMang($scope, $http) {
    var tarMg = this;

    $scope.selectedFiles = {};

    $http
      .get('http://localhost:3000')
      .success(function(data) {
        $scope.files = angular.fromJson(data);
      });

    $scope.addProposedFilesByKey = function(event) {
      if (event.keyCode === 13) {
        $scope.addProposedFiles();
      }
    };

    $scope.addProposedFiles = function() {
      var add = true;
      angular.forEach($scope.proposedFiles, function(pFile) {
        angular.forEach($scope.selectedFiles, function(sFile, sUUID) {
          if (angular.equals(pFile, sUUID)) {
            add = false;
          }
        });
        if (add === true) {
          $scope.selectedFiles[pFile] = $scope.files[pFile];
        }
      });
      $scope.updateTarItems();
    };

    $scope.removeSelectedFiles = function() {
      angular.forEach($scope.removeProposed, function (rFile) {
        angular.forEach($scope.selectedFiles, function(sFile, sUUID) {
          if (angular.equals(rFile, sUUID)) {
            delete $scope.selectedFiles[sUUID];
          }
        });
      });
      $scope.updateTarItems();
    };

    $scope.updateTarItems = function() {
      $scope.tarItems = '';
      angular.forEach($scope.selectedFiles, function(sF) {
        $scope.tarItems = $scope.tarItems + " " + sF.name;
      });
    };
  }]);
})(angular);

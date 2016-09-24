(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.message = "";

  $scope.checkLunch = function () {
    if ($scope.items === "") {
      $scope.message = "Please enter data first";
      return;
    }
    var itemsArray = $scope.items.split(",");

    if (itemsArray.length <= 3)
      $scope.message = "Enjoy!";
    else
      $scope.message = "Too much!";
  };
}

})();

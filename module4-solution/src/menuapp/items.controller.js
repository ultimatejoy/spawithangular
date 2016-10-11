(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['items'];
function ItemsController(items) {
  // console.log(items);
  var vm = this;
  vm.items = items;
}

})();

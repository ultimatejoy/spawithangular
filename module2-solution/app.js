(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  
  toBuy.boughtItem = function (index) {
    ShoppingListCheckOffService.boughtItem(index);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of to-buy and bought items
  // The "To Buy" list should be pre-populated with a list of at least 5 items.
  // (Hint: Use an array of object literals, where each item will be similar to
  // { name: "cookies", quantity: 10 }) 
  var toBuyItems = [
    {name: "Avocado", quantity: 8},
    {name: "cookies", quantity: 10},
    {name: "oranges", quantity: 20},
    {name: "brocolli", quantity: 2},
    {name: "candies", quantity: 16},
    {name: "drinks", quantity: 6}
  ];
  var boughtItems = [];

  service.boughtItem = function (itemIndex) {
    // remove item from the "to buy" array and push it to the "bought" array
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();

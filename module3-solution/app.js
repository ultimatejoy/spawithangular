(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    } //,
    // controller: foundItemsDirectiveController,
    // controllerAs: 'list',
    // bindToController: true
  };

  return ddo;
}

// The NarrowItDownController should be injected with the MenuSearchService. 
// The controller should call the getMatchedMenuItems method when appropriate and 
// store the result in a property called found attached to the controller instance.
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];
  menu.searchTerm = '';

  menu.getItems = function() {
    if (!(menu.searchTerm)) {
      // the user leaves the textbox empty and clicks the "Narrow It Down For Me!" 
      menu.found = null;
      return;
    }
    menu.found = [];

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
  

  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  }
}

// The service should have the following method: getMatchedMenuItems(searchTerm). 
// That method will be responsible for reaching out to the server (using the $http service) 
// to retrieve the list of all the menu items. Once it gets all the menu items, 
// it should loop through them to pick out the ones whose description matches the 
// searchTerm. Once a list of found items is compiled, it should return that list 
// (wrapped in a promise). Remember that the then function itself returns a promise.
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      if (searchTerm == false)
        return [];

      var foundItems = [];
      var list = result.data.menu_items;

      for (var i = 0; i < list.length; i++) {
        var description = list[i].description;
        // console.log(description);
        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(list[i]);
        }
      }
      if (foundItems.length === 0)
        // nothing is found as a result of the search
        return null;

      // return processed items
      return foundItems;
    });
  }
}

})();

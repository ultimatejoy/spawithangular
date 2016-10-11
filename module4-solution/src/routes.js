(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Menu Categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories-container.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      categories: ['MenuDataService', function (MenudataService) {
        return MenudataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/items-container.template.html',
    controller: "ItemsController as items",
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams, MenudataService) {
        return MenudataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();

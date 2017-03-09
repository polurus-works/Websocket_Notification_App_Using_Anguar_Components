/* Notification App - Routes
* page: rountes.js
* description: routing app. Used ui-router which is flexible. by default '/notifications' page it redirects
*/

(() => {
      'use strict';
    angular
        .module("notificationApp")
        .config(routesConfig);
    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'PAGES'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, PAGES) {

        $locationProvider.html5Mode(false);

        /* Default Page */

        $urlRouterProvider.otherwise('/notifications');

        /* App Routes */
        $stateProvider
            .state('notifications', {
                url: '/notifications',
                templateUrl: PAGES.NOTIFICATIONS
            });

    }
})();

/* Notification App - Module Loads
* page: app.js
* description: loading all modules
*/

(() => {
  'use strict';

    angular
        .module('notificationApp', ['ui.router', 'ngWebSocket']);
})();

/* Notification App - Constants
* page: constants.js
* description: Global constants : Not in use
*/

(() => {
  	'use strict';

	angular
			.module('notificationApp')
			.constant('PAGES', {
				'NOTIFICATIONS' : 'html/pages/notifications.html',
				'WS_URL' : 'ws://echo.websocket.org/',
				'NOTIFICATION_DETAIL': 'html/pages/notitificationDetail.html',
				'NOTIFICATION_LIST': 'html/pages/notitificationList.html'
			});
})();

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

/* Notification App - Services
* page: services.js
* description: loading all services. Websocket API integrated here.
*/

(() => {
  'use strict';

    angular
        .module('notificationApp')
        .factory('notificationServices', notificationServices);

    notificationServices.$inject = ['$websocket'];
    /** @ngInject */
    function notificationServices($websocket) {

    let ws = $websocket('ws://echo.websocket.org/');
    let notifyList = [];

    ws.onMessage(function(event) {
      console.log('message: ', event);
      let res;
      try {
        res = JSON.parse(event.data);
      } catch(e) {
        res = {'taskType': '1', 'message': event.data};
      }

      //taskType : 1 (Assigned Tasks), 2 - Reminders
      notifyList.push({
        taskType: 1,
        content: 'Oliver Quiver has assigned the interview. Book Travel task to you',
        timeStamp: new Date()
      },{
        taskType: 2,
        content: 'Buck Owens has assigned the Mobility. Submit task to you',
        timeStamp: new Date()
      },{
        taskType: 1,
        content: 'Hans Zolo has assigned the Mobility. Complete task to you',
        timeStamp: new Date()
      },{
        taskType: 1,
        content: 'Steve Jobs has assigned the Mobility. Complete task to you',
        timeStamp: new Date()
      },{
        taskType: 1,
        content: 'Tim cook has assigned the Mobility. Complete task to you',
        timeStamp: new Date()
      });
    });

    ws.onError(function(event) {
      console.log('connection Error', event);
    });

    ws.onClose(function(event) {
      console.log('connection closed', event);
    });

    ws.onOpen(function() {
      console.log('connection open');
      ws.send(notifyList);
    });

    return {
      notifyList: notifyList,
      status: function() {
        return ws.readyState;
      },
      send: function(message) {
        if (angular.isString(message)) {
          ws.send(message);
        }
        else if (angular.isObject(message)) {
          ws.send(JSON.stringify(message));
        }
      }

    };

    }
})();

/* Notification App - Components
* page: notificationDetails.js
* description: creating notification details component <notification-detail></notification-detail>
*/

(() => {
    'use strict';

    function NotificationDetailController(notificationServices) {
        var ctrl = this;
        ctrl.today = new Date();
    }

    angular.module('notificationApp').component('notificationDetail', {
        templateUrl: 'html/pages/notificationDetail.html',
        controller: NotificationDetailController,
        bindings: {
            hero: '<'
        }
    });
})();

/* Notification App - Components 
* page: notificationDetails.js
* description: creating notification details component. component logic, get websocket services from notificationServices
*/

(() => {
    'use strict';

    function NotificationListController($scope, $element, $attrs, notificationServices, filterFilter, $rootScope) {
        var ctrl = this;
        // This would be loaded by $http etc.
        ctrl.list = notificationServices.notifyList.reverse();

        // Date logic - Today, Yesterday not yet implemented.
        ctrl.today = new Date();
        ctrl.date = new Date();
        ctrl.ysday = new Date();
        ctrl.ysday.setDate(ctrl.ysday.getDate() - 1);

        ctrl.getCount = (strCat) => {return filterFilter(notificationServices.notifyList, {taskType: strCat}).length;}
    }

    angular.module('notificationApp').component('notificationList', {
        templateUrl: 'html/pages/notificationList.html', //constant
        controller: NotificationListController
    });
})();

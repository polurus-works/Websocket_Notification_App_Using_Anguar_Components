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

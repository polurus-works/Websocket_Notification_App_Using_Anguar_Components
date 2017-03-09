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

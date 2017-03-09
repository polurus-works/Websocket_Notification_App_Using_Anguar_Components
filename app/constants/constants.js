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

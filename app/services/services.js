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

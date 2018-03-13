angular.module('todoList').factory('todoListFact', ['$resource',
    function($resource) {
        return $resource('/todo/:Id', { Id: '@_id'
        }, {
                update: {
                    method: 'PUT'
                }
            });
    }
]);
angular.module('todoList').controller('todoListCtrl', ['$scope','$rootScope', 'todoListFact', function($scope, $rootScope, todoListFact) {

	todoListFact.query().$promise.then(function(success){
		 $scope.todoList = success;
	}, function(err) {

	});

	console.log($scope.todoList);

	$scope.add = function(newtodo) {

		var todo2 = new todoListFact(newtodo);

		todo2.etat = false;

		todoListFact.save(todo2).$promise.then(function(succ) {
			

		}, function(err) {
			console.log(err);
		});


	}

	socket.on('updateTodo', function (data) {
                            
             var index =  _.findIndex($scope.todoList, function(o, i) 
             {      
              		return o._id == data._id;
             });
              $scope.todoList[index] = data;
              $scope.$apply();     

    });


	socket.on('newTodo', function (data) {
             var newtodo55 = new todoListFact(data);
             console.log(newtodo55);
             $scope.todoList.push(newtodo55);
             $scope.$apply();
             //$scope.todoList = data;
     });



	$scope.finish = function(todo) {
		var newtodo = new todoListFact(todo);
		newtodo.$update({'Id' : todo._id});
	}

}]);

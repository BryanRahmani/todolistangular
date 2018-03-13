angular.module('todoList').controller('todoListCtrl', ['$scope','$rootScope', 'todoListFact', function($scope, $rootScope, todoListFact) {

	todoListFact.query().$promise.then(function(success){
		 console.log(success);
		 $scope.todoList = success;
	}, function(err) {

	});

	console.log($scope.todoList);

	$scope.add = function(newtodo) {

		newtodo.etat = false;

		todoListFact.save(newtodo).$promise.then(function(succ) {
			$scope.todoList.push(succ);
			
			console.log($scope.todoList);

		}, function(err) {
			console.log(err);
		});


	}


	$scope.finish = function(todo) {

		console.log(todo);

		todo.$update({'Id' : todo._id});
	}

}]);

angular.module('todoList').controller('todoListCtrl', ['$scope','$rootScope', 'todoListFact', function($scope, $rootScope, todoListFact) {

	$scope.todoList = [];


	$scope.todoList = todoListFact.query();

	$scope.add = function(newtodo) {

		$scope.newtodo.etat = "false";
		

		// fin de variable on vide le todo;

		var addtodo = new todoListFact($scope.newtodo);

		addtodo.$save();

		$scope.todoList.push(addtodo);

		$scope.newtodo = null;
	}


	$scope.finish = function(todo) {
		console.log(todo);
		todo.$update({'Id' : todo._id });
	}

}]);

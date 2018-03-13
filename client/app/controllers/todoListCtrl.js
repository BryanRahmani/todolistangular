angular.module('todoList').controller('todoListCtrl', ['$scope','$rootScope', 'todoListFact', function($scope, $rootScope, todoListFact) {

	$scope.todoList = [];


	$scope.todoList = todoListFact.query();

	$scope.add = function(newtodo) {

		$scope.newtodo.etat = "false";

		$scope.todoList.push({'note' : newtodo.note , 'etat' :  newtodo.etat});
		
		//console.log(newtodo);

		console.log(todoListFact);

		todoListFact.save(newtodo);	

		// fin de variable on vide le todo;
		$scope.newtodo = "";
	}

}]);

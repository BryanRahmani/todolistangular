angular.module('todoList').controller('todoListCtrl', ['$scope','$rootScope', 'todoListFact', function($scope, $rootScope, todoListFact) {

	

	//Récuperation des taches enregistrer API
	todoListFact.query().$promise.then(function(success){
		 $scope.todoList = success;
	}, function(err) {

	});


	//Envoie nouvelle tâche API
	$scope.add = function(newtodo) {

		var todo2 = new todoListFact(newtodo);

		todo2.etat = false;

		todoListFact.save(todo2).$promise.then(function(succ) {
			
		$scope.newtodo.note = "";

		}, function(err) {
			console.log(err);
		});


	}


	// Envoie suppresion tâche API
	$scope.delete = function(todo){
		var newtodo = new todoListFact(todo);
		newtodo.$delete();
	}


	// Envoi changement d'état API 
	$scope.finish = function(todo) {
		var newtodo = new todoListFact(todo);
		newtodo.$update({'Id' : todo._id});
	}


	// Socket qui gère l'état d'une tache
	socket.on('updateTodo', function (data) {
                            
             var index =  _.findIndex($scope.todoList, function(o, i) 
             {      
              		return o._id == data._id;
             });
              $scope.todoList[index] = data;
              $scope.$apply();     

    });


	// Socket qui gère la suppresion d'une tache
    socket.on('deleteTodo', function (data) {
                            
             var index =  _.findIndex($scope.todoList, function(o, i) 
             {      
              		return o._id == data._id;
             });
             
             $scope.todoList.splice(index, 1);
             $scope.$apply();     

    });

    //Socket qui gère la création d'une tache
	socket.on('newTodo', function (data) {
             
           	var newtodo55 = new todoListFact(data);
             $scope.todoList.push(newtodo55);
             $scope.$apply();
             //$scope.todoList = data;
     });

}]);

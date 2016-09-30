angular.module('newApp', [])
  .controller('TodoCtrl', function() {
    var todoList = this;
    todoList.totalTodos=1002;
    todoList.todos=[{text:'coldplay is music',done:false},
                    {text:'music is coldplay',done:false}];
    todoList.addTo=function(){
      todoList.todos.push({text:todoList.todoNext,done:false});
      todoList.todoNext='';
    }
    todoList.remaining=function(){
      var count=0;
      angular.forEach(todoList.todos,function(todo){
        count += todo.done ? 0 : 1;
      });
      return count;
    }
    todoList.archive=function(){
       var oldTodos=todoList.todos;
       todoList.todos=[];
       angular.forEach(oldTodos,function(todo){
         if(!todo.done)
         {
           todoList.todos.push(todo);
         }
       });
    }
  });

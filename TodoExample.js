// Todo Meteor Example
// David Lighty

// Specifies Client side scripts.  Cannot run server side.
if (Meteor.isClient) {
  Template.title.title = function () {
    return "Welcome to TodoExample.";
  };

  // Bind template property to collection
  Template.todos.todos=function(){
    return Todos.find(); // Returns the whole collection.
  }

  // Create template event handlers
  Template.todos.events({
    // 'click':function(){
    //   // Fires on all clicks.  Enable this and it will prevent the click on AddTodo.
    // },
    'click #AddTodo': function(evt,template){
      // Add todo
      var title = template.find('#newTodo').value;
      Meteor.call("addTodo",{
        title:title
      });
    },
    'dblclick #todoTitle':function(){
      // Edit mode
    }
  });
}


// Server side functions, can only run on the server.
if (Meteor.isServer) {


}


//  If not wrapped in a isClient or isServer, then it's open to both sides.
//  This is great for Collections...in an easy example.


// Todos : Model Example
/*
  {
    title:      String,
    dateAdded:  Number,
    isFinished: Boolean
  }
*/
Todos = new Meteor.Collection('todos');

Meteor.methods({
  addTodo: function(params) {
    // Add new todo by an param object
    // It is up to the caller to send in the correct items.

    Todos.insert({
      title: params.title,
      dateAdded: new Date()
    });
  },
  removeTodo: function(_id) {
    // Remove Todo by ID
    Todos.remove(_id);
  }
});
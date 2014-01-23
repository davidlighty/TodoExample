// Todo Meteor Example
// David Lighty
// Specifies Client side scripts.  Cannot run server side.

if (Meteor.isClient) {
  Template.title.title = function() {
    return "Welcome to TodoExample.";
  };

  Todos = new Meteor.Collection("todos");

  // Bind template property to collection
  Template.todos.todos = function() {
    return Todos.find(); // Returns the whole collection.
  }

  // Create template event handlers
  Template.todos.events({
    // 'click':function(){
    //   // Fires on all clicks.  Enable this and it will prevent the click on AddTodo.
    // },
    'click #AddTodo': function(evt, template) {
      // Add todo
      var title = template.find('#newTodo').value;
      Meteor.call("addTodo", {
        title: title
      });
    },
    'dblclick #todoTitle': function(template) {
      // Edit mode
      var editing = Session.get(template.data._id + "-editing");
      Session.set(template.data._id + "-editing", !editing); // Toggle the state.
    },
    'click .delBtn': function() {
      // Even though I don't pass in the evt and template, I still can access quite a bit.
      // For a delete, we just need to push our current ID to the delete method.
      Meteor.call("removeTodo", this._id);
    }
  });

  // On Create method
  // Template.todos.created=function(){
  //   // Init a session var for editing that is false.
  //   Session.set(this.data._id+"-editing",false);  
  // }
  // Create a simple helper method for our todo.
  // Error: this doesn't work in a broad "todos" template.
  // To access our unique todo._id correctly (easily) scope it into it's own template.
  // When that template is created, it will have access to this._id as the todo._id.
  Template.todos.helpers({
    editing: function() {
      return Session.get(this._id + "-editing");
    }
  });

  // Scope into just the todo template.
  // A better name might be todoItem or todo_item.
  Template.todo.helpers({
    editing: function() {
      return Session.get(this._id + "-editing");
    }
  });

  // On a Todo Create method
  Template.todo.created = function() {
    // Init a session var for editing that is false.
    Session.set(this.data._id + "-editing", false);
  }

  // Todo Events
  Template.todo.events({
    'dblclick #todoTitle': function() {
      // Edit mode
      var editing = Session.get(this._id + "-editing");
      Session.set(this._id + "-editing", !editing); // Toggle the state.
    },
    'click .editBtn': function(evt, template) {
      // Update 
      var newTitle = template.find('#todoEdit').value;
      Meteor.call("updateTodo", this._id, {
        title: newTitle
      });
      // Finish edit
      var editing = Session.get(this._id + "-editing");
      Session.set(this._id + "-editing", !editing); // Toggle the state.
    },
    'click .delBtn': function() {
      // Even though I don't pass in the evt and template, I still can access quite a bit.
      // For a delete, we just need to push our current ID to the delete method.
      Meteor.call("removeTodo", this._id);
    }
  });
}


// Server side functions, can only run on the server.
if (Meteor.isServer) {



}


//  If not wrapped in a isClient or isServer, then it's open to both sides.
//  This is great for Collections...in an easy example.
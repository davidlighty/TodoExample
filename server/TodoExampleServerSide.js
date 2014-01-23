// Todo Server Side
// David Lighty
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
		console.log("Server:Add new Todo");
		Todos.insert({
			title: params.title,
			dateAdded: new Date()
		});
	},
	updateTodo: function(_id, params) {
		// You can push the _id in params or have it seperate.
		Todos.update(_id, {
			title: params.title
		});
	},
	removeTodo: function(_id) {
		// Remove Todo by ID
		Todos.remove(_id);
	}
});
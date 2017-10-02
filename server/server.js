var mongoose = require('mongoose');
<<<<<<< HEAD

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
=======
var mongodbUri = "mongodb://localhost:27017/TodoApp";
var options = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri,options);

var Todo = mongoose.model('Todo',{
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

// var newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);
// },(e) => {
// 	console.log('Unable to save todo')
// });

var wildTodo = new Todo({
	text: 'Shutdown games',
	completed: true,
	completedAt: 123
});

wildTodo.save().then((content) => {
	// console.log('saved wildtodo',content);
	console.log(JSON.stringify(content, undefined, 2));
},(e) => {
	console.log('Unable to save todo');
});
>>>>>>> a370efa9d619f4e33d6b3429362deb01005099dc

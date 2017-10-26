const ObjectID = require('mongodb'); 

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findByIdAndRemove('59f19082761a93403dfa9027').then((todo) => {
	console.log(todo);
});
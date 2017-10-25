const ObjectID = require('mongodb'); 

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59f036fb8288fd085cd2a51011';
var idUser = '59f05f85abff8c1a248b3ceb';

// if(!ObjectID.isValid(id)){
// 	console.log('ID is not valid');
// }

// Todo.find({
// 	_id : id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id : id
// }).then((todo) => {
// 	console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by id',todo);
// }).catch((e) => {
// 	console.log(e)
// });

User.findById(idUser).then((user) => {
	if(!user){
		return console.log('Id User not found');
	}
	console.log('Id user email : ',JSON.stringify(user,undefined,2));
}).catch((e) => {
	console.log(e)
});


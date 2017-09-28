// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id : new ObjectID("59cb7504e2147b991453fdf5")
	// },{
	// 	$set : {
	// 		completed : true
	// 	}
	// },{
	// 	returnOriginal : false
	// }).then((result) => {
	// 	console.log(result)
	// });

	db.collection("Users").findOneAndUpdate({
		_id : new ObjectID("59cb7794e2147b991453fefe")
	},{
		$set:{
			name : "Wildan"
		},
		$inc:{
			age:1
		}
	},{
		returnOriginal: false
	}).then((result) => {
		console.log(result)
	});

	// db.close();
});
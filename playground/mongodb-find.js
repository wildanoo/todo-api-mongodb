// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
	if (err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('59bfe0863147a00ef94a8a9b')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs,undefined,2));
	// },(err) =>{
	// 	console.log('Unable to fetch todos',err);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// },(err) =>{
	// 	console.log('Unable to fetch todos',err);
	// });

	// db.collection('Users').find({name:'Wildan'}).count().then((counting) => {
	// 	console.log(`Users count for Wildan : ${counting} `);
	// },(err) => {
	// 	console.log('Unable to fetch Users', err);
	// });
	
	db.collection('Users').find({name:"Wildan"}).toArray().then((doc) => {
		console.log('Isi dari Users');
		console.log(JSON.stringify(doc,undefined,2));
	},(err) => {
		console.log('Unab;e to fetch Wildan',err);
	});

	// db.close();
});
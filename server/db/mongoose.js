var mongoose = require('mongoose');
// var mongodbUri = "mongodb://localhost:27017/TodoApp";
var options = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp",options);

module.exports = {mongoose};
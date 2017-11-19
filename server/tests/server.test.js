const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('Should create a new todo',(done) => {
		var text = 'Testing todo text';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text)
		})
		.end((err,res) => {
			if (err){
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e));
		});
	});

	it('Should not create todo with invalid body data',(done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res) => {
			if (err){
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos',() => {
	it('Should get all todos',(done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			// console.log('Isi res.body.todos.length: ',res.body.todos.length);
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('Should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('Should return 404 if todo not found', function (done) {
		this.timeout(500)

		var hexID = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexID}`)
		.expect(404)
		.end(setTimeout(done, 300));
	});

	it('Should return 404 for non object ID', (done) => {
		request(app)
		.get('/todos/123abd')
		.expect(404)
		.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('Should remove a todo',(done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todos._id).toBe(hexId);
		})
		.end((err,res) => {
			if(err){
				return done(err);
			}

			Todo.findById(hexId).then((todos) => {
				expect(todos).toNotExist().done();
			}).catch((e) => done());

		});
	});

	it('Should return 404 if todo not found',(done) => {
		var hexID = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${hexID}`)
		.expect(404)
		.end(done);
	});

	it('Should return 404 if ObjectID is invalid',(done) => {
		request(app)
		.delete('/todos/123abd')
		.expect(404)
		.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('Should update the todo', (done) => {
		var idOne = todos[0]._id.toHexString();
		var text = "Sample text for testing";

		request(app)
		.patch(`/todos/${idOne}`)
		.send({text,
			completed : true
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.text).toBe(text);
			expect(res.body.todos.completed).toBe(true);
			expect(typeof res.body.todos.completedAt).toBe('number');
		})
		.end(done);
	});

	it('Should clear completedAt when todo is not completed',(done) => {
		var idTwo = todos[1]._id.toHexString();
		var text = "Dummy text for second test";

		request(app)
		.patch(`/todos/${idTwo}`)
		.send({
			text,
			completed : false
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.text).toBe(text);
			expect(res.body.todos.completed).toBe(false);
			expect(res.body.todos.completedAt).toBeNull();
		})
		.end(done)
	});

});
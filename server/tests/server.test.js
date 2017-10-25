const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id : new ObjectID(),
	text : 'First test todo'
},{
	_id : new ObjectID(),
	text : 'Second test todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

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
			console.log('Isi res.body.todos.length: ',res.body.todos.length);
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

	it('Should return 404 if todo not found', function done(){
		this.timeout(500);
  
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
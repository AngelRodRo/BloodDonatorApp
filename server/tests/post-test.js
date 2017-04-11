'use strict'

let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');

let server = require('../index');
let Post = require('../models/post');
let should = chai.should();

chai.use(chaiHttp);

describe('Post',()=>{

	beforeEach((done)=>{
		Post.remove({},(err)=>{
			done();
		});
	});


	describe('/PUT Post :id', () => {

		it('it should UPDATE a post with a ID', (done) => {

			let post = new Post({
				firstName: "Angel",
				lastName: "Rodriguez",
				email:"aleangrodriguez123@gmail.com",
				bloodGroup:"OH+",
				address:"Av.Tacna",
				latitude: -14,
				longitude:-70
			});

			post.save((err,post) => {

				let mPost = {
					firstName:"Angel 1",
					lastName: "Rodriguez 2",
					email:"aleangrodriguez123@gmail.com",
					bloodGroup:"OH+",
					address:"Av.Tacna",
					latitude:-14,
					longitude:-70
				};

				chai.request(server)
					.put('/api/posts/' + post.id)
					.send(mPost)
					.end((err,res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message');
						res.body.should.have.property('post');
						done();
					})

			})

		});
	});

	describe("/GET POST",()=>{
		it('it should GET a all POST', done=>{

			chai.request(server)
				.get('/api/posts')
				.end((err,res)=>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('posts');
					res.body.should.have.property('message');
					done();
				});
		});

		it('it should GET a POST around a position and radius', done=>{

			let latitude = -12.050605,
				longitude= -77.0406881,
				radius = 5;

			chai.request(server)
				.get('/api/posts?latitude='+latitude+'&longitude'+longitude+'&radius='+radius)
				.end((err,res)=>{
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('posts');
					res.body.should.have.property('message');
					done();
				});
		})
	})

	describe('/GET Post :id',() => {
		it('it should GET a post with ID', (done) => {
			
			let post = new Post({
				firstName: "Angel",
				lastName: "Rodriguez",
				email:"aleangrodriguez123@gmail.com",
				bloodGroup:"OH+",
				address:"Av.Tacna",
				latitude:-70,
				longitude: -18
			});

			post.save((err,post) => {
				chai.request(server)
					.get('/api/posts/'+ post.id)
					.end((err,res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('post');
						res.body.should.have.property('message');
						res.body.user.have.property('_id').eql(book.id);
						done();
					});

			})

		});



	});


	describe('/POST Post',() => {
		it('it should not POST a new post without firstName or lastName',  (done) => {

			let post = {
				lastName : "Rodriguez",
				email : "aleangrodriguez@gmail.com",
				bloodGroup : "OH+"
			}

			chai.request(server)
				.post('/api/posts')
				.send(post)
				.end((err,res) => {
					res.should.have.status(503);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					done();
				})

		});

		it('it should POST a new post with all parameters',  (done) => {

			let post = {
				firstName: "Angel",
				lastName: "Rodriguez",
				email:"aleangrodriguez123@gmail.com",
				bloodGroup:"OH+",
				address:"Av.Tacna",
				latitude:-17,
				longitude:-80
			}

			chai.request(server)
				.post('/api/posts')
				.send(post)
				.end((err,res) => {

					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Post created successfully!');
					done();
			})
		})

		it('it should not POST if a email is existing', (done) => {

			let post = {
				firstName: "Angel",
				lastName: "Rodriguez",
				email:"aleangrodriguez@gmail.com",
				bloodGroup:"OH+",
				address:"Av.Tacna",
				latitude:-17,
				longitude:-80
			};

			chai.request(server)
				.post('/api/posts')
				.send(post)
				.end((err,res) => {
					chai.request(server)
						.post('/api/posts')
						.send(post)
						.end((err,res)=>{
							res.should.have.status(503)
							res.body.should.be.a('object');
							res.body.should.have.property('errors')
							res.body.errors.should.have.property('code');
							done();
						})
			});	

		})

		it('it should not POST with empty data',(done) => {
			let post = {};

			chai.request(server)
				.post('/api/posts')
				.send(post)
				.end((err,res) => {
					res.should.have.status(503);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					done();
				})
		})


	})
})
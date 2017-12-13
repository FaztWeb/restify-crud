const restify = require('restify')
const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

const users = {
	1: {
		name: 'John',
		lastName: 'carter'
	}
};
let usersCount = 1;

// routes
server.get('/user', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.writeHead(200)
	res.end(JSON.stringify(users))
})

server.get('/user/:id', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.writeHead(200);
	res.end(JSON.stringify(users[parseInt(req.params.id)]))
});

server.post('/user', (req, res, next) => {
	console.log(req.body)
	let user = req.body
	usersCount++
	user.id = usersCount
	users[user.id] = user
	res.setHeader('Content-type', 'application/json')
	res.writeHead(200)
	res.end(JSON.stringify(user))
})

server.put('/user/:id', (req, res, next) => {
	const user = users[parseInt(req.params.id)]
	const update = req.body
	for(let field in update){
		user[field] = update[field]
	}
	res.setHeader('Content-Type', 'application/json')
	res.writeHead(200)
	res.end(JSON.stringify(user))
});

server.del('/user/:id', (req, res, next) => {
	delete users[parseInt(req.params.id)];
	res.setHeader('Content-Type', 'application/json')
	res.writeHead(200)
	res.end(JSON.stringify(true));
});

// start the server
server.listen(3000, () => {
	console.log('%s listening at %s', server.name, server.url)
})

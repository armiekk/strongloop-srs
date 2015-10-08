var path = require('path');
var loopback = require('loopback');
var a = loopback();

module.exports = function (app) {
	//set default path
	app.use('/js', loopback.static(__dirname + '../../../client/js'));
	app.use('/bower_components', loopback.static(__dirname + '../../../client/bower_components'));
	app.use('/css', loopback.static(__dirname + '../../../client/css'));
	app.use('/views', loopback.static(__dirname + '../../../client/views'));
	
	app.get('/index', function (req, res, next) {
		res.sendFile('index.html', { root: __dirname + '../../../client' });
	});
	
	app.get('/signin', function (req, res, next) {
		res.sendFile('index.html', {
			root: __dirname + '../../../client'
		});
	});
	
	app.get('/signup', function (req, res, next) {
		res.sendFile('index.html', {
			root: __dirname + '../../../client'
		});
	});
	
	app.get('/dashboard*', function (req, res, next) {
		res.sendFile('index.html', {
			root: __dirname + '../../../client'
		});
	});
	
	app.get('/signupSuccess', function (req, res, next) {
		res.sendFile('index.html', {
			root: __dirname + '../../../client'
		});
	});
	
	//verify user
	app.get('/verified', function (req, res) {
		res.sendFile('index.html', {
			root: __dirname + '../../../client'
		});
	});

	//admin dashboard
	app.get('/authenticate', function (req, res, next) {
		console.log(req.query);
		app.models.SrsUser.find({
			where: {
				email: req.query.email
			}
		}, function (err, token) {
			if (err) {
				res.send('error authentication');
				console.log('error authentication');
			} else {
				console.log(token);
				res.json(token);
			}
		});
	});
};

var config = require('../../server/config.json');
var path = require('path');
module.exports = function (SrsUser) {
	//prefix realm
	SrsUser.beforeRemote('login', function (context, user, next) {
		console.log('> SrsUser.beforeRemote login triggered');
		var req = context.req;
		next();
	});
	
	//add realm
	SrsUser.beforeRemote('create', function (context, user, next) {
		console.log('> SrsUser.beforeRemote create triggered');
		var req = context.req;
		if(req.body.admin === undefined){
			req.body.admin = false;
		}
		next();
	});

	//send verification email after registration
	SrsUser.afterRemote('create', function (context, user) {
		console.log('> SrsUser.afterRemote create triggered');
		var options = {
			type: 'email',
			to: user.email,
			from: 'kengpohnsakul.a@gmail.com',
			subject: 'ทดสอบ',
			template: path.resolve(__dirname, '../../server/views/verify.ejs'),
			redirect: '/verified',
			user: user
		};
		user.verify(options, function (err, response, next) {
			if (err) return next(err);

			console.log('> verification email sent:', response);
			context.res.redirect('/signupSuccess');
		});
	});
};

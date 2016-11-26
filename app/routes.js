var configDB = require('../config/database.js');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'a4g443fds2A',
	database: 'routes'
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function buildDynamicAttractionQuery(values) {
    var size = Object.size(values);
	var conditions = [];
	var index;
	for (index = 0; index < size; index++) {
		if (typeof values[index] !== 'undefined') {
			conditions.push("type = ?");
		}
	}

	return {
		where: size ?
			conditions.join(' OR ') : conditions,
		values: values
	};
}
module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		//res.render('index.ejs'); // load the index.ejs file
		res.render('start.html')
	});

	app.get('/popAttr', function(req, res) {
		var sql = 'SELECT * FROM Attraction ORDER BY rating DESC;';
		connection.query(sql, function(err, results) {
			if(!err){
				res.json(results);
			} else {
				res.json({
					"code" : 50,
					"status" : "Error in connection to database."
				});
			}
		});
	});

	app.get('/recRoute', function(req, res) {
		var sql = 'SELECT * FROM StoredRoute ORDER BY rating DESC LIMIT 2;' ;
		connection.query(sql, function(err, results) {
			if(!err){
				res.json(results);
			} else {
				res.json({
					"code" : 50,
					"status" : "Error in connection to database."
				});
			}
		});
	});

	app.get('/makeAttr', function(req, res) {
		if(!req.query.type){
			// return empty set, since there are no parameters passed
			res.json([]);
		}
		else{
			var stringify = JSON.stringify(req.query.type);
			var content = JSON.parse(stringify);
			var types = buildDynamicAttractionQuery(content);
			var arrayLength = types.values.length;
			var prepStatements = [];
			var noFilter = false;

			if (arrayLength < 1 || arrayLength == 'undefined') {
				noFilter = true;
			}
			else {
				for(i = 0; i < arrayLength; i++) {
					prepStatements.push(types.values[i]);
				}
			}

			if(noFilter){
				sql = 'SELECT * FROM Attraction ORDER BY rating DESC;' ;
				connection.query(sql, function(err, results) {
					if(!err){
						res.json(results);
					} else {
						res.json({
							"code" : 50,
							"status" : "Error in connection to database."
						});
					}
				});
			} else {
				var sql = 'SELECT * FROM Attraction WHERE ' + types.where + ' ORDER BY rating DESC;' ;
				connection.query(sql, prepStatements, function(err, results) {
					if(!err){
						res.json(results);
					} else {
						res.json({
							"code" : 50,
							"status" : "Error in connection to database."
						});
					}
				});
			}
		}
	});

	// =====================================
	// ROUTES AND MAP  =====================
	// =====================================
	app.get('/showRecRoute', function(req, res) {
		if(!req.query.uname && !req.query.rid){
			// return empty set, since there are no parameters passed or not all of them are passed
			res.json([]);
		}
		else{
			var stringify_uname = JSON.stringify(req.query.uname);
			var uname = JSON.parse(stringify_uname);

			var stringify_rid = JSON.stringify(req.query.rid);
			var rid = JSON.parse(stringify_rid);

			var sql = 'SELECT A.aid, A.name, A.lat, A.lng FROM StoredRoute S, Attraction A, RouteStop R WHERE S.rid = R.rid and R.aid = A.aid and S.uname = ? and S.rid = ? ORDER BY R.id ASC;';

			var prepStatements = [];
			prepStatements.push(uname);
			prepStatements.push(rid);

			connection.query(sql, prepStatements, function(err, results) {
				if(!err){
					res.json(results);
				} else {
					res.json({
						"code" : 50,
						"status" : "Error in connection to database."
					});
				}
			});


		}
	});



	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.user);
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

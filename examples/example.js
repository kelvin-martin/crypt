// Example usage script for crypt.
// Load from the Node shell
'use strict';
const crypt = require('../crypt.js');

// User storage. In a real project this 
// would be a database like mongoDB, MySQL etc.
var users = [];

// List all the users in the storage
exports.getUserList = function () {
	for (var i=0; i<users.length; i++) {
		console.log("Name:     " + users[i].name);
		console.log("Password: " + users[i].password);
		console.log("Phrase:   " + users[i].phrase);
	}
};

// Returns a user from the storage
exports.getUser = function (name) {
	var user = null;
	for (var i=0; i<users.length; i++) {
		if (name === users[i].name) {
			user = users[i];
			break;
		}
	}
	return user;
};

// Creates a new user and saves the user to storage
exports.putUser = function (name, password) {
	var passPhrase = crypt.randomPassPhrase(32);
	var encryptedPassword = crypt.encrypt(password,passPhrase);

	// Create a new user and store the new user
	users.push({ "name": name, 
				"password": encryptedPassword, 
				"phrase": passPhrase });
};

// Updates a user's password
exports.postUser = function (name, oldPassword, newPassword) {
	var found = false;
	for (var i=0; i<users.length; i++) {
		if (name === users[i].name) {		
			if (crypt.verify(oldPassword, users[i].password, users[i].phrase)) {
				var passPhrase = crypt.randomPassPhrase(32);
				var encryptedPassword = crypt.encrypt(newPassword,passPhrase);

				users[i].password = encryptedPassword;
				users[i].phrase = passPhrase;
				found = true;
				console.log("User password updated!");
				break;
			} else {
				console.log("Password does not match!");
				break;
			}
		}
	}
	if (found === false) {
		console.log("User: " + name + " not found!");
		return;
	}
};

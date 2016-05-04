###Examples

Example.js shows an example usage of crypt for handling and storing users passwords.

A simple in-memory array is used to store the user's name, password etc. instead of a database engine like mongoDB or MySQL.

The script shows:

	1. Adding a new user, encrypting the user's password so that only the encypted password and pass phrase is stored.
	2. Changing a user's password by supplying the current password, validating it and then updating the storage with the new password.
	3. Retrieving a user from the storage. 

Run the node shell and load the scrpt using: __*e = require("./example.js")*__

Add a new user e.g.: __*e.putUser("Fred", "hello123")*__

List all the users e.g.: __*e.getUserList()*__

Update a user's password e.g.: __*e.postUser("Fred", "hello123", "tarzan")*__


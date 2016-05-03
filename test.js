// Test suite for crypt.

const crypt = require('./crypt.js');

var plain_text = "Finally, you should know that in JavaScript" + 
"(and Node.js especially), there's a difference between an " +
"error and an exception. An error is any instance of the Error " +
"class. Errors may be constructed and then passed directly to " +
"another function or thrown. When you throw an error, it becomes " +
"an exception.2 Here's an example of using an error as an exception";

// General usage of randomPassPhrase(), encrypt() and decrypt().
function test1() {
	console.log("Test1 - start");

	var passPhrase = crypt.randomPassPhrase();
	var encrypted = crypt.encrypt(plain_text, passPhrase);
	if (!encrypted) {
		console.log('Encryption: (fail)');
	} else {
		console.log('Encryption: (pass)');

		var decrypted = crypt.decrypt(encrypted, passPhrase);
		if (!decrypted) {
			console.log('Decryption: (fail)');
		} else {
			console.log(decrypted);
			console.log('Decryption: (pass)');
		}
	}

	console.log("Test1 - end");
};

// Test for a different pass phrase on decryption. 
// The decryption should fail.
function test1A() {
	console.log("Test1A - start");

	var passPhrase = crypt.randomPassPhrase();
	var encrypted = crypt.encrypt(plain_text, passPhrase);
	if (!encrypted) {
		console.log('Encryption: (fail)');
	} else {
		console.log('Encryption: (pass)');

		var decrypted = crypt.decrypt(encrypted, crypt.randomPassPhrase());
		if (!decrypted) {
			console.log('Decryption: (pass)');
		} else {
			console.log('Decryption: (fail)');
		}
	}

	console.log("Test1A - end");
};


// Test for randomPassPhrase() return value.
function test2() {
	console.log("Test2 - start");
	
	var passPhrase = crypt.randomPassPhrase();
	var result = passPhrase.length == 256 ? "pass" : "fail";
	console.log("Length: (" + result + ")");
	
	console.log("Test2 - end");
};

// Test for correct error return for invalid parameters for encrypt(). 
function test3() {
	console.log("Test3 - start");
	
	var encrypted = crypt.encrypt(4, "afgfg4t5ghghb");
	var result = encrypted === null ? "pass" : "fail";
	console.log("Invalid datatype:" + " (" + result + ")");
	
	encrypted = crypt.encrypt(plain_text, 4566);
	result = encrypted === null ? "pass" : "fail";
	console.log("Invalid datatype:" + " (" + result + ")");
	
	encrypted = crypt.encrypt(plain_text, {"passphrase": "afgfg4t5ghghb"});
	result = encrypted === null ? "pass" : "fail";
	console.log("Invalid datatype:" + " (" + result + ")");
	
	encrypted = crypt.encrypt(plain_text, "afgfg4t5ghghb");
	result = encrypted !== null ? "pass" : "fail";
	console.log("Valid datatype:" + " (" + result + ")");

	console.log("Test3 - end");
};

test1();
test1A();
test2();
test3();
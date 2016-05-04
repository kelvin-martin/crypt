// Test suite for crypt.
// Run from 'test' subfolder

const crypt = require('../crypt.js');
var test = require('unit.js'); 

var plain_text = "Finally, you should know that in JavaScript" + 
"(and Node.js especially), there's a difference between an " +
"error and an exception. An error is any instance of the Error " +
"class. Errors may be constructed and then passed directly to " +
"another function or thrown. When you throw an error, it becomes " +
"an exception.2 Here's an example of using an error as an exception";

function test1() {
	console.log('Test for usage of randomPassPhrase(), encrypt() and decrypt().');

	var passPhrase = crypt.randomPassPhrase();
	var encrypted = crypt.encrypt(plain_text, passPhrase);
	
	test
		.value(encrypted).isString()
		.string(encrypted).isNotEmpty();

	var decrypted = crypt.decrypt(encrypted, passPhrase);

	test
		.value(decrypted).isString()
		.string(decrypted).isNotEmpty()
		.string(decrypted).is(plain_text);
};

function test2() {
	console.log('Test for a different pass phrase on decryption');

	var passPhrase = crypt.randomPassPhrase();
	var encrypted = crypt.encrypt(plain_text, passPhrase);

	test
		.value(encrypted).isString()
		.string(encrypted).isNotEmpty();

	var decrypted = crypt.decrypt(encrypted, crypt.randomPassPhrase());
		
	test
		.value(decrypted).isNull();
};

function test3() {
	console.log('Test for randomPassPhrase() return value.');
	var passPhrase = crypt.randomPassPhrase();

	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(256);
};

function test4() {
	console.log('Test for correct error return for invalid parameters for encrypt().');
	
	var encrypted = crypt.encrypt(4, "afgfg4t5ghghb");
	test
		.value(encrypted).isNull();

	encrypted = crypt.encrypt(plain_text, 4566);
	test
		.value(encrypted).isNull();
	
	encrypted = crypt.encrypt(plain_text, {"passphrase": "afgfg4t5ghghb"});
	test
		.value(encrypted).isNull();
	
	encrypted = crypt.encrypt(plain_text, "afgfg4t5ghghb");
	test
		.value(encrypted).isString()
		.string(encrypted).isNotEmpty();
};

test1();
test2();
test3();
test4();
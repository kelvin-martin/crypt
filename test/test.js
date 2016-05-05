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

function test5() {
	console.log('Test for handing length in randomPassPhrase().');

	var passPhrase = crypt.randomPassPhrase(128);

	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(256); // 128*2

	passPhrase = crypt.randomPassPhrase(192);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(384); // 192*2

	passPhrase = crypt.randomPassPhrase(1);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(64);	// Min value	

	passPhrase = crypt.randomPassPhrase(0);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(64);	// Min value

	passPhrase = crypt.randomPassPhrase(-234);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(64);	// Min value

	passPhrase = crypt.randomPassPhrase(1024);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(2048); // 1024*2		

	passPhrase = crypt.randomPassPhrase(99999999);	
	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(2048); // Max value	
};

function test6() {
	console.log('Test for hashPassPhrase().');

	var passPhrase = crypt.hashPassPhrase("asdh wueh467d76bcr8hfs");

	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(64); 

	var passPhrase = crypt.hashPassPhrase();

	test
		.must(passPhrase).be.a.string();
	test
		.string(passPhrase).isNotEmpty()
		.number(passPhrase.length).is(64);

	passPhrase = crypt.hashPassPhrase("7bcghaeq53cdb4390b0a4aef");
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

function test7() {
	console.log('Test for verify().');

	var passPhrase = crypt.randomPassPhrase(32);
	var encrypted = crypt.encrypt(plain_text, passPhrase);

	test
		.bool(crypt.verify(plain_text, encrypted, passPhrase))
		.isTrue(crypt.verify(plain_text, encrypted, passPhrase));
	test
		.bool(crypt.verify(encrypted, plain_text, passPhrase))
		.isFalse(crypt.verify(encrypted, plain_text, passPhrase));
	test
		.bool(crypt.verify(plain_text, encrypted, crypt.randomPassPhrase()))
		.isFalse(crypt.verify(plain_text, encrypted, crypt.randomPassPhrase()));
	test
		.bool(crypt.verify("qwerty123456", encrypted, passPhrase))
		.isFalse(crypt.verify("qwerty123456", encrypted, passPhrase));
	test
		.bool(crypt.verify("6755$322olZS", encrypted))
		.isFalse(crypt.verify("6755$322olZS", encrypted));
	test
		.bool(crypt.verify("qfguuoPy12&^%56"))
		.isFalse(crypt.verify("qfguuoPy12&^%56"));
	test
		.bool(crypt.verify())
		.isFalse(crypt.verify());
};

// Run tests
test1();
test2();
test3();
test4();
test5();
test6();
test7();
// End tests
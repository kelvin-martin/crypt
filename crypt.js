// Simple functions, using Node's crypto library, to encrypt and decrypt
// blocks of text. This is especially suited for storage of passwords.
'use strict'; 
const crypto = require('crypto');

// Advanced Encryption System AES256 is a symmetrical 
// encryption algorithm used by the Node Crypto library.
var algorithm = 'aes256';

// Returns a random hex string that can be used as a pass phrase.
// Takes an optional length parameter for the length of the pass phrase
// length should be between 32 and 1024.
module.exports.randomPassPhrase = function (length) {
	if (typeof length === 'undefined') {
    	length = 128;
  	} else if (length < 32) {
  		length = 32;
  	} else if (length > 1024) {
  		length = 1024;
  	}
	const buf = crypto.randomBytes(length);
	return buf.toString('hex');
};

// Returns a hash digest string using the supplied text
// that can be used as a pass phrase.
module.exports.hashPassPhrase = function (text) {
	const hash = crypto.createHash('sha256');
	if (typeof text === 'undefined') {
		text = this.randomPassPhrase();
	}
	hash.update(text);
	return hash.digest('hex');
};

// Encrypts a block of text using the supplied pass phrase.
// If an error occurs a null object is returned.
module.exports.encrypt = function (text, passPhrase) {
	try {
	    const cipher = crypto.createCipher(algorithm, passPhrase);
	    var encrypted = cipher.update(text,'utf8','hex');
	    encrypted += cipher.final('hex');
	    return encrypted;
	} catch (ex) {
		return null;
	}
};

// Decrypts a block of previously encrypted text using the 
// supplied pass phrase.
// If an error occurs a null object is returned.
module.exports.decrypt = function (text, passPhrase) {
	try {
		const decipher = crypto.createDecipher(algorithm, passPhrase);
	    var decrypted = decipher.update(text,'hex','utf8');
	    decrypted += decipher.final('utf8');
	    return decrypted;
	} catch (ex) {
	    return null;
	}
};

// Verifies (true or false) the plain text is the source 
// of the encryted text using the given pass phrase.
module.exports.verify = function (text, encrypted, passPhrase) {
	var result = false;
	var decrypted = this.decrypt (encrypted, passPhrase);
	if (decrypted) {
		result = (decrypted === text) ? true : false;
	} 
	return result;
};

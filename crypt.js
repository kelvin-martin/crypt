// Simple functions, using Node's crypto library, to encrypt and decrypt
// blocks of text. This is especially suited for storage of passwords.

const crypto = require('crypto');

// Advanced Encryption System AES256 is a symmetrical 
// encryption algorithm used by the Node Crypto library.
var algorithm = 'aes256';

// Returns a random hex string that can be used as a pass phrase.
exports.randomPassPhrase = function () {
	const buf = crypto.randomBytes(128);
	return buf.toString('hex');
};

// Encrypts a block of text using the supplied pass phrase.
// If an error occurs a null object is returned.
exports.encrypt = function (text, passPhrase) {
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
exports.decrypt = function (text, passPhrase) {
	try {
		const decipher = crypto.createDecipher(algorithm, passPhrase);
	    var decrypted = decipher.update(text,'hex','utf8');
	    decrypted += decipher.final('utf8');
	    return decrypted;
	} catch (ex) {
	    return null;
	}
};
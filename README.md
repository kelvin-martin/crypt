# crypt
Simple functions, using Node's crypto library, to encrypt and decrypt blocks of text. The crypt functions can be used for encrypting passwords for storage. 

###Installation
Download the zip file from GitHub and '*extract all*' into a folder.

Alternatively clone from git using command:
__*git clone https://github.com/kelvin-martin/crypt.git*__

This will install all the source files from the GitHub repo and setup a local git repo.

To run the test suite you will need to install UnitJS into the test folder. From the command line cd into the 'test' folder and run '__*npm install*__'.  This will install unit.js into the 'node_module' subdirectory.

To run the test suite from the test folder use '__*npm start*__' or '__*node test.js*__'.

To run the test suite from the crypt folder use '__*npm test*__' or '__*node ./test/test.js*__'.

###Testing
The crypt package has been tested on:

	1. Windows 10 64bit environment
	2. Node v4.4.3 (stable build)
	3. JUnit v2.0.0

###API
All these functions operate synchronously.

__randomPassPhrase (length)__

Returns a random binary encoded hexadecimal string that can be used as a pass phrase for __*encrypt()*__. The returned pass phrase string of 'length'x2 being generated from 'length' randomly generated bytes.The optional length parameter defines the length of the pass phrase. The default value for length is 128. If length is used it should between 32 and 1024. __*randomPassPhrase()*__ limits length to be between 32 and 1024 inclusive.

Because of Nodes crypto functions a new pass phase should be used for every encrypt operation. This pass phrase should be saved so that the plain text can be regenerated usng __*decrypt()*__. If the pass phrase is lost there is no way of regenerating the oringinal text.

__hashPassPhrase (text)__

Returns a hash digest string using the supplied text that can be used as a pass phrase. The binary encoded hexadecimal hash digest returned has a length of 64 being generated using SHA256. If no text is supplied then __*randomPassPhrase()*__ is used to generate the input text for the hash.

__encrypt (text, passPhrase)__

Encrypts a block of text (__*string*__) using the supplied pass phrase (__*string*__) and returns a cypher (__*string*__) of the text. If an error occurs a null object is returned. Therefore, the return value sould always be tested for null.

The current implementation uses Node's Advanced Encryption System AES256 algorithm. If a different pass phrase is used for every encrypt() operation then the cryptography should be secure. If a global pass phrase is used then it is possible to perform successful attacks on multiple generated cyphers which have used the same pass phrase.

__decrypt (text, passPhrase)__

Decrypts a block of previously encrypted text (__*string*__) using the supplied pass phrase (__*string*__) and returns a plain text (__*string*__) decryption. If an error occurs a null object is returned. Therefore, the return value sould always be tested for null. If a different pass phrase is used then the function will return null.
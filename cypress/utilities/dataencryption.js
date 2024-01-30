const fs = require('fs');
const crypto = require('crypto');

const privateKeyPath = 'private-key.pem'; // Change this to your private key file path

// Function to generate a new RSA private key
function generatePrivateKey() {
  const { privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
  fs.writeFileSync(privateKeyPath, privateKey);
}

// Function to read the private key from file
function readPrivateKey() {
  try {
    return fs.readFileSync(privateKeyPath, 'utf8');
  } catch (err) {
    console.error('Private key not found. Run generatePrivateKey() to create one.');
    process.exit(1);
  }
}

// Function to encrypt data with RSA
function encryptData(data, publicKey) {
  const bufferData = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, bufferData);
  return encrypted.toString('base64');
}

// Function to decrypt data with RSA
function decryptData(encryptedData, privateKey) {
  const bufferEncrypted = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, bufferEncrypted);
  return decrypted.toString('utf8');
}

// Function to write encrypted data to a text file
function writeEncryptedDataToFile(encryptedData, fileName) {
  fs.writeFileSync(fileName, encryptedData, 'utf8');
}

// Function to read encrypted data from a text file
function readEncryptedDataFromFile(fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (err) {
    console.error('Error reading encrypted data from file:', err.message);
    process.exit(1);
  }
}

// Example usage
//generatePrivateKey();

const publicKey = readPrivateKey(); // In a real-world scenario, the public key should be securely shared with the party responsible for decryption.

const originalData = 'Sensitive information here!';
console.log('Original Data:', originalData);

const encryptedData = encryptData(originalData, publicKey);
console.log('Encrypted Data:', encryptedData);

const fileName = 'encrypted-data.txt';
writeEncryptedDataToFile(encryptedData, fileName);
console.log(`Encrypted data written to ${fileName}`);

const loadedEncryptedData = readEncryptedDataFromFile(fileName);
const decryptedData = decryptData(loadedEncryptedData, readPrivateKey());
console.log('Decrypted Data:', decryptedData);
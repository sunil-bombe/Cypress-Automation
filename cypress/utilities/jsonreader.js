const fs = require('fs');

// Function to read JSON data from a file
function readJsonFile(fileName) {
  try {
    const jsonData = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(jsonData);
  } catch (err) {
    console.error(`Error reading JSON file ${fileName}:`, err.message);
    return null;
  }
}

// Function to write JSON data to a file
function writeJsonFile(fileName, data) {
  const jsonData = JSON.stringify(data, null, 2); // Use 2 spaces for indentation
  fs.writeFileSync(fileName, jsonData, 'utf8');
  console.log(`JSON data written to ${fileName}`);
}

// Function to update JSON data in a file
function updateJsonFile(fileName, updateFunction) {
  const currentData = readJsonFile(fileName);
  if (currentData) {
    const updatedData = updateFunction(currentData);
    writeJsonFile(fileName, updatedData);
  }
}

// Example usage
const jsonFileName = 'example.json';

// Reading JSON data from a file
const jsonData = readJsonFile(jsonFileName);
console.log('Read JSON Data:', jsonData);

// Writing JSON data to a file
const newData = { key1: 'value1', key2: 'value2' };
writeJsonFile(jsonFileName, newData);

// Updating JSON data in a file
updateJsonFile(jsonFileName, (data) => {
  data.key1 = 'new value';
  data.newKey = 'new data';
  return data;
});

// Reading updated JSON data from a file
const updatedData = readJsonFile(jsonFileName);
console.log('Updated JSON Data:', updatedData);

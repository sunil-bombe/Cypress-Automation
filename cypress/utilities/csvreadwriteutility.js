const fs = require('fs');
const parse = require('csv-parse');
const { stringify } = require('csv-stringify');

// Function to read CSV file into an array of objects
function readCsvFile(fileName, callback) {
  const csvData = [];
  fs.createReadStream(fileName)
    .pipe(parse.parse({ columns: true }))
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', () => {
      callback(csvData);
    })
    .on('error', (error) => {
      console.error(`Error reading CSV file ${fileName}:`, error.message);
    });
}

// Function to write array of objects into a CSV file
function writeCsvFile(fileName, data, callback) {
  const csvOptions = { header: true, columns: Object.keys(data[0]) };
  const ws = fs.createWriteStream(fileName);
  ws.on('finish', () => {
    callback();
  });
  stringify(data, csvOptions).pipe(ws);
}

// Function to get an object by providing the value of the first column
function getObjectByFirstColumnValue(fileName, firstColumnValue, callback) {
  readCsvFile(fileName, (data) => {
    const foundObject = data.find((row) => row[Object.keys(row)[0]] === firstColumnValue);
    callback(foundObject);
  });
}

// Example usage
const csvFileName = 'example.csv';

// Writing data to CSV file
const newData = [
  { Name: 'John', Age: 25, City: 'New York' },
  { Name: 'Alice', Age: 30, City: 'San Francisco' },
  { Name: 'Bob', Age: 28, City: 'Seattle' },
];

writeCsvFile(csvFileName, newData, () => {
  console.log(`CSV data written to ${csvFileName}`);

  // Reading entire CSV data
  readCsvFile(csvFileName, (csvData) => {
    console.log('Read CSV Data:', csvData);

    // Getting an object by providing the value of the first column
    const searchValue = 'Alice';
    getObjectByFirstColumnValue(csvFileName, searchValue, (foundObject) => {
      console.log(`Object with ${Object.keys(foundObject)[0]} = ${searchValue}:`, foundObject);
    });
  });
});

const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017'; // Change this URL based on your MongoDB server configuration
const dbName = 'yourDatabaseName'; // Change this to your database name

// Function to connect to the MongoDB server
async function connectToMongo() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

// Function to execute a query
async function executeQuery(db, collectionName, query) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection[query.method](...query.args);
    console.log('Query executed successfully:', result);
    return result;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

// Function to close the MongoDB connection
async function closeMongoConnection(client) {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
    throw error;
  }
}

// Example usage
(async () => {
  const db = await connectToMongo();

  // Example query: find all documents in a collection
  const query = {
    method: 'find',
    args: ['yourCollectionName', {}], // Change this to your collection name
  };

  await executeQuery(db, ...query);

  await closeMongoConnection(db);
})();

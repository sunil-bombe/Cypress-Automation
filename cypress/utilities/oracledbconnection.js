const oracledb = require('oracledb');

// Connection parameters
const connectionParams = {
  user: 'yourUsername',
  password: 'yourPassword',
  connectString: 'yourConnectionURL', // Format: hostname:port/serviceName
};

// Function to connect to the Oracle database
async function connectToOracle() {
  try {
    const connection = await oracledb.getConnection(connectionParams);
    console.log('Connected to Oracle Database');
    return connection;
  } catch (error) {
    console.error('Error connecting to Oracle Database:', error.message);
    throw error;
  }
}

// Function to execute a query
async function executeQuery(connection, sql, binds = [], options = {}) {
  try {
    const result = await connection.execute(sql, binds, options);
    console.log('Query executed successfully:', result);
    return result;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  }
}

// Function to close the Oracle database connection
async function closeOracleConnection(connection) {
  try {
    await connection.close();
    console.log('Oracle Database connection closed');
  } catch (error) {
    console.error('Error closing Oracle Database connection:', error.message);
    throw error;
  }
}

// Example usage
(async () => {
  const connection = await connectToOracle();

  // Example query: select all rows from a table
  const query = {
    sql: 'SELECT * FROM yourTableName', // Change this to your table name
  };

  await executeQuery(connection, query.sql);

  await closeOracleConnection(connection);
})();

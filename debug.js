console.log('=== DEBUG START ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('WEBSERVICE_DATABASE:', process.env.WEBSERVICE_DATABASE);
console.log('WEBSERVICE_HOST:', process.env.WEBSERVICE_HOST);
console.log('WEBSERVICE_PORT:', process.env.WEBSERVICE_PORT);

// Test config loading
try {
  const config = require('./config');
  console.log('Config loaded successfully:', JSON.stringify(config, null, 2));
} catch (error) {
  console.log('Config loading failed:', error.message);
}

// Test MongoDB connection
const { MongoClient } = require('mongodb');

async function testMongoConnection() {
  try {
    const uri = process.env.WEBSERVICE_DATABASE || 'mongodb+srv://Devfi:Devfi@cluster0.zl8gnau.mongodb.net/pa11y-webservice?retryWrites=true&w=majority';
    console.log('Testing MongoDB connection with:', uri);
    
    const client = new MongoClient(uri);
    await client.connect();
    console.log('MongoDB connection successful!');
    
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.log('MongoDB connection failed:', error.message);
  }
}

testMongoConnection().then(() => {
  console.log('=== DEBUG END ===');
  process.exit(0);
});

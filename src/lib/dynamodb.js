const { DynamoDB } = require('aws-sdk')

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:28000',
};

const dynamoDB = new DynamoDB(options)
const dynamoDBClient = new DynamoDB.DocumentClient(options);

module.exports = { dynamoDB, dynamoDBClient }

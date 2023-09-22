const AWS = require("aws-sdk");
const { aws } = require("../config");

const createDynamoDB = (tableName) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: aws.region,
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
    sessionToken: aws.sessionToken,
  });

  return {
    dynamoDb,
    TableName: tableName,
  };
};

module.exports = createDynamoDB;

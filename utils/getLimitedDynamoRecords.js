const createDynamoDB = require("../client/dynamoDb");
const { aws } = require("../config");
const getLimitedDynamoRecords = async (limit) => {
  const { dynamoDb, TableName } = createDynamoDB(aws.tableName);
  const params = {
    TableName,
    Limit: limit,
  };
  return await dynamoDb.scan(params).promise();
};

module.exports = getLimitedDynamoRecords;

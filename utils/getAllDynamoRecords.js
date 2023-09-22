const paginate = require("./paginate");
const createDynamoDB = require("../client/dynamoDb");
const { aws } = require("../config");

const getAllDynamoRecords = async () => {
  const { dynamoDb, TableName } = createDynamoDB(aws.tableName);

  const params = {
    TableName,
    // Add other necessary query parameters here
  };

  let items = [];
  let lastEvaluatedKey = null;

  do {
    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    const result = await dynamoDb.scan(params).promise();
    items = items.concat(result.Items);
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return items;
};

module.exports = getAllDynamoRecords;

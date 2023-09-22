const AWS = require("aws-sdk");
const { aws } = require("../config");

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: aws.region,
  accessKeyId: aws.accessKeyId,
  secretAccessKey: aws.secretAccessKey,
  sessionToken: aws.sessionToken,
});

const UserPoolId = aws.userPool;

module.exports = { cognito, UserPoolId };

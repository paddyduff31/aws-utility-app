// config file to export env data
require("dotenv").config();

const config = {
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    userPool: process.env.AWS_USER_POOL,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    tableName: process.env.AWS_TABLE_NAME,
  },
};

module.exports = config;

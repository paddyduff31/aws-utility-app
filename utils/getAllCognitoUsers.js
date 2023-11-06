const paginate = require("./paginate");
const { UserPoolId, cognito } = require("../client/cognito");

const getAllCognitoUsers = async () => {
  let params = {
    UserPoolId,
  };

  let users = [];
  let paginationToken = null;

  do {
    if (paginationToken) {
      params.PaginationToken = paginationToken;
    }

    const result = await cognito.listUsers(params).promise();
    users = users.concat(result.Users);
    console.log("Users:", users.length);
    paginationToken = result.PaginationToken;
  } while (paginationToken);

  return users;
};

module.exports = getAllCognitoUsers;

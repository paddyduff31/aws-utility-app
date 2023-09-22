const { UserPoolId, cognito } = require("../client/cognito");

const getOneCognitoUser = async (userId) => {
  let params = {
    UserPoolId,
    Username: userId,
  };

  let user = null;

  cognito.adminGetUser(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
        console.log(data);
      user = data;
    }
  });

  return user;
};

module.exports = getOneCognitoUser;
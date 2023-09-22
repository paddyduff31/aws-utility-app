const getAllUsers = require("./getAllCognitoUsers");
const { UserPoolId } = require("../client/cognito");
const cognito = require("../client/cognito");
const TIMEOUT_DURATION = 1000;
const USER_STATUS_CONFIRMED = "CONFIRMED";
const USER_STATUS_EXTERNAL_PROVIDER = "EXTERNAL_PROVIDER";

const confirmAllUsers = async () => {
  const users = await getAllUsers();
  console.table(users);

  let usersConfirmed = 0;

  for (const user of users) {
    if (
      user.UserStatus === USER_STATUS_CONFIRMED ||
      user.UserStatus === USER_STATUS_EXTERNAL_PROVIDER
    )
      continue;

    const params = {
      UserPoolId,
      Username: user.Username,
    };

    try {
      await cognito.adminConfirmSignUp(params).promise();
      usersConfirmed++;
    } catch (err) {
      console.error(err);
    }

    // throttle requests to avoid hitting AWS rate limits
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT_DURATION));
  }

  console.log("Users confirmed: ", usersConfirmed);
};

module.exports = confirmAllUsers;

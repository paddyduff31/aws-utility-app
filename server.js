const getAllCognitoUsers = require("./utils/getAllCognitoUsers");
const getAllDynamoRecords = require("./utils/getAllDynamoRecords");
const getOneCognitoUser = require("./utils/getOneCognitoUser");
const getLimitedDynamoRecords = require("./utils/getLimitedDynamoRecords");

const UserSignUpInfo = async () => {
  const users = await getAllCognitoUsers();
  const records = await getAllDynamoRecords();

  let deletedUsers = 0;
  let nhsUsers = 0;
  let nativeUsers = 0;
  let totalUsers = 0;
  let totalConverted = 0;

  for (const record of records) {
    if (record.SK === "DELETED#") {
      deletedUsers++;
    }
    // if record has both NhsId and ParticipantId, then it is a converted user
    if (record.NhsId && record.ParticipantId) {
      totalConverted++;
    } else if (record.NhsId) {
      nhsUsers++;
    } else if (record.ParticipantId) {
      nativeUsers++;
    }

    totalUsers++;
  }
  const previouslyDeleted = nativeUsers - users.length;
  console.log("Total previously deleted users in Cognito:", previouslyDeleted);

  deletedUsers += previouslyDeleted;
  nativeUsers -= previouslyDeleted;

  console.table({
    "Total Users": totalUsers,
    "Total Converted": totalConverted,
    "Total NHS Users": nhsUsers,
    "Total Native Users": nativeUsers,
    "Total Deleted Users": deletedUsers,
  });
};

const SmsVsTotpReport = async () => {
  let smsUsers = 0;
  let totpUsers = 0;

  const users = await getAllCognitoUsers();

  for (const user of users) {
    if (user.PreferredMfaSetting === "SMS_MFA") {
      smsUsers++;
    } else if (user.PreferredMfaSetting === "SOFTWARE_TOKEN_MFA") {
      totpUsers++;
    }
  }

  console.table({
    "SMS Users": smsUsers,
    "TOTP Users": totpUsers,
  });
}

const logUser = async () => {
  const user = await getOneCognitoUser("8b2c18b2-80b8-490d-97a0-7a2be0745570");
  console.log(user);
};


UserSignUpInfo().then(() => console.log("Done"));

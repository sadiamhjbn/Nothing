const UserSession = require('./models/UserSession');

const verify = function (token) {
  return UserSession
    .find({
      _id: token,
      isDeleted: false
    })
    .then(userSessions => {
      if (userSessions.length !== 1) {
        throw new Error('Invalid token');
      }
    });
};

module.exports.verify = verify;

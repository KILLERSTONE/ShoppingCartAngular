/* global functions */
/* global admin */
exports.listAllUsers = functions.https.onRequest((req, res) => {
  admin
    .auth()
    .listUsers()
    .then((listUsersResult) => {
      const users = listUsersResult.users.map((userRecord) => userRecord.toJSON())
      res.status(200).json(users)
    })
    .catch((error) => {
      console.error('Error listing users:', error)
      res.status(500).send('Error listing users')
    })
})

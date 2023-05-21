const router = require("express").Router();
//variables for all actions regarding user
const {
  getAllUsers,
  getOneUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router
  .route("/")
  .get(getAllUsers)
  .post(newUser)
  .put(updateUser)
  .delete(deleteUser)
//route to get to a single user
router.route("/:userId").get(getOneUser);
//route to add and remove friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router
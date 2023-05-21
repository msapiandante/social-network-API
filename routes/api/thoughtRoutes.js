const router = require("express").Router();
//variables for all different actions of thoughts 
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router
  .route("/")
  .get(getAllThoughts)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);
//route to get single thought 
router.route("/:thoughtId").get(getOneThought);
//route to add and remove reactions
router.route("/:thoughtId/reactions").post(newReaction).delete(deleteReaction);

module.exports = router;
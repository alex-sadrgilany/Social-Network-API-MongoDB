const router = require("express").Router();
// importing all the mongoose api functions from the thought controller file
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require("../../controllers/thought-controller");

// setting up all the various routes with necessary params
router.route("/")
    .get(getAllThoughts);

router.route("/:userId")
    .post(createThought);

router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions")
    .post(addReaction)

router.route("/:thoughtId/reactions/:reactionId")
    .delete(removeReaction)

    
module.exports = router;
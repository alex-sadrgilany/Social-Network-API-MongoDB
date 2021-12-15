const {
    Thought,
    User
} = require("../models");

const thoughtController = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
};

module.exports = thoughtController;
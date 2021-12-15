const { User } = require("../models");

const userController = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

module.exports = userController;
const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: "No user found with this id!" });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.id
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $push: { friends: req.params.friendId }
            },
            {
                new: true,
                runValidators: true
            }
        )
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $pull: { friends: req.params.friendId }
            },
            {
                new: true,
                runValidators: true
            }
        )
            .select("-__v")
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = userController;
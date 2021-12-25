const { 
    User, 
    Thought 
} = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get a single user by id
    getUserById(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .populate({
                path: "friends",
                select: "-__v"
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
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // update an existing user's username or email fields
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
    // delete a single user by id
    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.id
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                User.updateMany(
                    {
                        _id: { $in: dbUserData.friends }
                    },
                    {
                        $pull: { friends: req.params.id }
                    }
                )
                    .then(() => {
                        Thought.deleteMany(
                            {
                                username: dbUserData.username
                            }
                        )
                            .then(() => {
                                res.json(dbUserData);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // creates a relationship between two users and add one to another's 'friend list'
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
    // deletes a user from another user's friend list
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
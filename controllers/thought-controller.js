const {
    Thought,
    User
} = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById(req, res) {
        Thought.findOne({
            _id: req.params.id
        })
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {
                        _id: req.params.userId
                    },
                    {
                        $push: { thoughts: _id }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
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
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.id
        })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                return User.findOneAndUpdate(
                    {
                        _id: req.params.username
                    },
                    {
                        $pull: { thoughts: req.params.thoughtId }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $push: { reactions: req.body }
            },
            {
                new: true,
                runValidators: true
            }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $pull: { reactions: { reactionId: req.params.reactionId } }
            },
            {
                new: true
            }
        )
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = thoughtController;
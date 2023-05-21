const { User, Thought } = require("../models");
const { Types } = require('mongoose');

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(500).json(error));
    },
    // Get a single user and their thoughts/friends populated data
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((singleUser) => {
                if (!singleUser) {
                    res.status(404).json({ message: 'No user with this id!' });
                } else {
                    res.status(200).json(singleUser);
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    },
    // Create a new user
    newUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.status(200).json(newUser))
            .catch((error) => res.status(500).json(error));
    },
    // Update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $set: req.body },
            { new: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'No user with this id!' });
                } else {
                    res.status(200).json(updatedUser);
                }
            })
            .catch((error) => res.status(500).json(error));
    },
    // Delete user by id and thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.body.userId })
            .then((deletedUser) => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                return Thought.deleteMany({ username: deletedUser.username });
            })
            .then((thoughts) => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No thoughts found' });
                } else {
                    res.status(200).json({ message: 'Thought deleted.' });
                }
            })
            .catch((error) => res.status(500).json(error));
    },
    // Add friend to user
    addFriend(req, res) {
        const friend = Types.ObjectId(req.params.friendId);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: friend } },
            { runValidators: true, new: true }
        )
            .then((newFriend) => {
                if (!newFriend) {
                    res.status(404).json({ message: 'No user with this id!' });
                } else {
                    res.status(200).json(newFriend);
                }
            })
            .catch((error) => res.status(500).json(error));
    },
    // Delete friend from user
    deleteFriend(req, res) {
        const friend = Types.ObjectId(req.params.friendId);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: friend } },
            { runValidators: true, new: true }
        )
            .then((deletedFriend) => {
                if (!deletedFriend) {
                    res.status(404).json({ message: 'No user with this id!' });
                } else {
                    res.status(200).json(deletedFriend);
                }
            })
            .catch((error) => res.status(500).json(error));
    },
};
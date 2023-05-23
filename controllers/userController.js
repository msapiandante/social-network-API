const { User, Thought } = require("../models");
const { Types } = require('mongoose');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Get a single user
    async getOneUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
            res.json(singleUser)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Create a new user
    async newUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Update user by id
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $set: req.body },
                { new: true }
            );
            if (!updatedUser) {
                res.status(404).json({ message: 'No user with this id!' });
            } else {
                res.status(200).json(updatedUser);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Delete user by id and thoughts
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndRemove({ _id: req.body.userId });
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            const thoughts = await Thought.deleteMany({ username: deletedUser.username });
            if (!thoughts) {
                res.status(404).json({ message: 'No thoughts found' });
            } else {
                res.status(200).json({ message: 'Thought deleted.' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Add friend to user
    async addFriend(req, res) {
        try {
            const friend = Types.ObjectId(req.params.friendId);
            const newFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend } },
                { runValidators: true, new: true }
            );
            if (!newFriend) {
                res.status(404).json({ message: 'No user with this id!' });
            } else {
                res.status(200).json(newFriend);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete friend from user
    async deleteFriend(req, res) {
        try {
            const friend = Types.ObjectId(req.params.friendId);
            const deletedFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: friend } },
                { runValidators: true, new: true }
            );
            if (!deletedFriend) {
                res.status(404).json({ message: 'No user with this id!' });
            } else {
                res.status(200).json(deletedFriend);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};
const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtDB = await Thought.find();
      res.json(thoughtDB)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thoughtDB = await Thought.findOne({
        _id: req.params.thoughtId
      });
      res.json(thoughtDB)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

    // Create a thought
    async createThought(req, res) {
      try {
        const thoughts = await Thought.create(req.body);
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // Delete a thought
    async deleteThought(req, res) {
      try {
        const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (thoughts) {
          await User.deleteMany({ _id: { $in: thoughts.users } });
          res.json({ message: 'Thought deleted!' });
        } else {
          res.status(404).json({ message: 'No thought with that ID' });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // Update a thought
    async updateThought(req, res) {
      try {
        const thoughts = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
        if (thoughts) {
          res.json(thoughts);
        } else {
          res.status(404).json({ message: 'No thought with this ID' });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    // Create a new reaction
    async newReaction(req, res) {
      try {
        const newReaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
        if (!newReaction) {
          res.status(404).json({ message: 'Uh-oh! Something went wrong.' });
        } else {
          res.status(200).json(newReaction);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
      try {
        const deleteReaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.body.reactionId } } },
          { runValidators: true, new: true }
        );
        if (!deleteReaction) {
          res.status(404).json({ message: 'Uh-oh! Something went wrong' });
        } else {
          res.status(200).json(deleteReaction);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  };
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate('user')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }) 
      .populate('user')
      .select('-__v')
      .then((thought) =>
        thought 
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }) 
      .then((thought) =>
        thought 
          ? User.deleteMany({ _id: { $in: thought.users } }) 
              .then(() => res.json({ message: 'Thought deleted!' }))
          : res.status(404).json({ message: 'No thought with that ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        thought 
          ? res.json(thought)
          : res.status(404).json({ message: 'No thought with this ID' })
      )
      .catch((err) => res.status(500).json(err));
  },
};

// Create a new reaction
function newReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((newReaction) => {
      if (!newReaction) {
        res.status(404).json({ message: 'Oops! Something went wrong.' });
      } else {
        res.status(200).json(newReaction);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

// Delete a reaction
function deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.body.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((deleteReaction) => {
      if (!deleteReaction) {
        res.status(404).json({ message: 'Oops! Something went wrong' });
      } else {
        res.status(200).json(deleteReaction);
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
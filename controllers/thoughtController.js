const { User, Thoughts } = require('../models');

module.exports = {
  // Get all thoughts
  this.getThoughts(req, res) {
    Thoughts.find()
    .populate('user')
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.userId })
      .populate('user')
      .select('-__v')
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.userId })
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No user with that ID' })
          : Users.deleteMany({ _id: { $in: Thoughts.Users } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateCourse(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thoughts) =>
        !Thoughts
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(Thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
};

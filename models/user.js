

    * `email`
    * String
    * Required
    * Unique
    * Must match a valid email address(look into Mongoose's matching validation)

        * `thoughts`
        * Array of`_id` values referencing the`Thought` model

        * `friends`
    * Array of`_id` values referencing the`User` model(self - reference)
    * 
    * const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./thought');

// Schema to create User model 
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,,
    },
    thoughts: [thoughtsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;

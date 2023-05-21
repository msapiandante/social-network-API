const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction')
const Thought = model('thought', thoughtSchema);

//updates reaction count to thought schema
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

//thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return new Date(date).toLocaleDateString()
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

module.exports = Thought;
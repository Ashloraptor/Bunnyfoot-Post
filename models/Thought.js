const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        // username: { type: String,
        //         ref: 'User', },
        //This one was working, but need to reference User object
        username: {
            type: String,
            required: true
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        //   virtuals: true,
        },
        id: false,
      }
);

// Creates a virtual property 'reactionCount' that gets the amount of reactions per thought.
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
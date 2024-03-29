const { Schema, model } = require('mongoose');
const Thought = require('./Thought');
// const thoughtSchema = require('./Thought');


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, "Please enter a valid email address"]
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
            // Thought
            // thoughtSchema
          ],
        // reactions: :[reactionSchema],
        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
    },
    { 
        toJSON: {
          virtuals: true,
        },
        id: false, 
      }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema
.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Creates a virtual property 'reactionCount' that gets the amount of reactions per thought.
userSchema.virtual('thoughtCount').get(function(){
  return this.thoughts.length;
});

const User = model('User', userSchema);

module.exports = User;

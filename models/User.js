const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');
const Thought = require('./Thought');

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
            //Must match a valid email address (look into Mongoose's matching validation)
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/, "Please enter a valid email address"]
        },
        // thoughts: [Thought],
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
        //friends: [userSchema]
        //friendCount
        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ]
    },
    { //revision made based off of assignment 20
        toJSON: {
          virtuals: true,
        },
        id: false, //end revision
      }
);

// // Create a virtual property `friendCount` that gets the amount of friends per user

userSchema
.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

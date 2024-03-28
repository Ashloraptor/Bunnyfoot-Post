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
        },
        // thoughts: [Thought],
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
        //friend
        //friendCount
    },
    { //revision made based off of assignment 20
        toJSON: {
          virtuals: true,
        },
        id: false, //end revision
      }
);

const User = model('User', userSchema);

module.exports = User;

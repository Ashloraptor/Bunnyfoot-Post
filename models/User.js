const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        // email: {
        //     type: String,
        //     unique: true,
        //     required: true,
        //     //Must match a valid email address (look into Mongoose's matching validation)
        // },
        thoughts: [thoughtSchema]
        // , ReferenceError: Cannot access 'userSchema' before initialization
        // friends: [userSchema]
    },
    {
        toJSON: {
          getters: true,
        },
      }
);

const User = model('user', userSchema);

module.exports = User;

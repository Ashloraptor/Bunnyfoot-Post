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
        email: {
            type: String,
            unique: true,
            required: true,
            //Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: [thoughtSchema],
        // , ReferenceError: Cannot access 'userSchema' before initialization
        // Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
        // virtuals: {
        //     friendCount: {
        //         get() {return `${this.friends}`;},
        //         set(v) {
        //             // v is the value being set, ref mongoose.com/docs/tutorials/virtuals.html
        //             const friends = v.substring(0, v.indexOf(' '));
        //             this.set({friends});
        //         }
        //     }
        // }
    },
    {
        toJSON: {
          getters: true,
        },
      }
);

const User = model('user', userSchema);

module.exports = User;

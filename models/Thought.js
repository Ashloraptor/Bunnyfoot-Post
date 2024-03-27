const { Schema, model } = require('mongoose');
// const { Schema, Types } = require('mongoose');

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
            default: Date.now,
            //Use a getter method to format the timestamp on query
        },
        // username:{
        //     type: String,
        //     required: true,
        // }
        users: [
            {
                type: Schema.Types.ObjectID,
                ref: 'user',
            },
        ],
        // ,
        // reactions:[reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

// const Thought = model('thought', thoughtSchema);

// module.exports = Thought;
module.exports = thoughtSchema;
// module.exports.thoughtSchema = thoughtSchema;

//Schema Settings: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
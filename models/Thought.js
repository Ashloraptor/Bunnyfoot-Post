const { Schema, model } = require('mongoose');
// const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //Use a getter method to format the timestamp on query
        },
        // username:{
        //     type: String,
        //     required: true,
        // }
        users: [{ type: Schema.Types.ObjectID,
                ref: 'User', }],
        reactions:[reactionSchema],
        // reactions: [{type: Schema.Types.ObjectID,
        // ref: 'reaction'}],
    },
    {
        toJSON: {
          virtuals: true,
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
// module.exports = thoughtSchema;
// module.exports.thoughtSchema = thoughtSchema;

//Schema Settings: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
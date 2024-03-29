const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

module.exports = reactionSchema;
// const Reaction = model('Reaction', reactionSchema);
// module.exports = Reaction;
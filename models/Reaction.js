const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            // Use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            // Default value is set to a new ObjectId
            default: () => new Types.ObjectId(),
            // default: [new ObjectId],
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
            // Use a getter method to format the timestamp on query
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
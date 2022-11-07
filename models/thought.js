const { Schema, model } = require('mongoose');
const {formatDate} = require('../utils/helpers')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return formatDate(date)
            } 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction'}]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought
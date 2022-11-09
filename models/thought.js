const { Schema, model} = require('mongoose');
const { ObjectId } = require('mongoose').Types
const {formatDate} = require('../utils/helpers')

const reactionSchema = new Schema (
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId 
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return formatDate(date)
            } 
        }
    }
)

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
        reactions: [reactionSchema]
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

const Reaction = model('reaction', reactionSchema)

module.exports = {Thought, Reaction}
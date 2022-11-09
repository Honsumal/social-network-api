const{Thought, User} = require('../models')

module.exports = {
    getThoughts (req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought (req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .then((thought) => 
            !thought
                ? res.status(400).json({ message: 'no thought with that id'})
                : res.json(thought)
            )
    },
    createThought (req, res) {
        Thought.create(req.body)
            .then((thoughtData) => 
            ! thoughtData
                ? res.status(404).json({message:'thought not found'})
                : User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: {thoughts: thoughtData}},
                    { new: true}
                )
            )
            .then((s) => 
                !s
                    ? res.status(404).json({ message: 'error'})
                    : res.json({ message: 'Thought added'}))
            .catch((err) => res.status(500).json(err))
    },
    updateThought (req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId},
            { thoughtText: req.body.thoughtText},
            { new: true},
        )
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err))
    },
    deleteThought (req, res) {
        Thought.findByIdAndRemove({_id: req.params.thoughtId})
            .then((thoughtData) => 
            ! thoughtData
            ? res.status(404).json({message:'thought not found'})
            : User.findOneAndUpdate(
                { username: req.body.username },
                { $pull: {thoughts: req.params.thoughtId}},
                { new: true}
            )
        )
        .then((s) => 
            !s
                ? res.status(404).json({ message: 'error'})
                : res.json({ message: 'Thought deleted'}))
        .catch((err) => res.status(500).json(err))
    },
    createReaction (req, res) {
        Thought.findOneAndUpdate (
            { _id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            { new: true}
        )
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    deleteReaction (req, res) {
        Thought.findOneAndUpdate (
            { _id: req.params.thoughtId},
            { $pull: {reactions: {_id: req.params.reactionId}}},
            { new: true})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
}

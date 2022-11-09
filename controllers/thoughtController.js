const{Thought, Reaction} = require('../models')

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
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err))
    },
    updateThought (req, res) {
        Thought.findByIdAndUpdate(
            {_id: req.params.thoughtId},
            {thoughtText: req.body},
            {new: true},
        )
        .then((thoughtData) => res.json(thoughData))
        .catch((err) => res.status(500).json(err))
    },
    deletePost (req, res) {
        Thought.findByIdAndDelete({_id: req.params.thoughtId})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    createReaction (req, res) {
        Reaction.create(req.body)
            .then((rxn) => res.json(rxn))
            .catch((err) => res.status(500).json(err))
    },
    deleteReaction (req, res) {
        Reaction.findByIdAndDelete({_id:req.params.reactionId})
            .then((rxn) => res.json(rxn))
            .catch((err) => res.status(500).json(err))
    },
}

//TODO
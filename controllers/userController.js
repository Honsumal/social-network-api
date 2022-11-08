const { User, Thought } = require('../models')

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.body.userId})
        .then((post) => 
        !post
            ? res.status(400).json({ message: 'no user with that id'})
            : res.json(post)
        )
        .catch((err) => res.status(500).json(err))
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {
        User.findByIdAndUpdate(
            {_id: req.body.userId}, 
            {username: req.body.username, email: req.body.email},
            {new: true},
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findByIdAndDelete({_id: req.body.userId})
            .then((userData) => 
                Thought.deleteMany({username: userData.username})) //take out if is doesnt work
                .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res) {
        User.findByIdAndUpdate(
            {_id : req.params.userId},
            { $push: {friends: req.params.friendId}}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            {_id : req.params.userId},
            { $pull: {friends: req.params.friendId}}
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    }
}
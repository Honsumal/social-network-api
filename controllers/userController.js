const { User, Thought } = require('../models')

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.user_id})
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
            {_id: req.params.id}, 
            {username: req.body.username, 
            email: req.body.email},
            {new: true},
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then((userData) => 
                Thought.deleteMany({username: userData.username})) //take out if is doesnt work
                .catch((err) => res.status(500).json(err))
    },
}
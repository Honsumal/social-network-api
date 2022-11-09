const { User, Thought } = require('../models')

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.body.userId})
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
        !user
            ? res.status(400).json({ message: 'no user with that id'})
            : res.json(user)
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
            {_id: req.params.userId}, 
            {username: req.body.username, email: req.body.email},
            {new: true},
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findByIdAndDelete({_id: req.params.userId})
            .then((user) => 
                !user
                ? res.status(404).json({message: 'no user found'})
                : Thought.deleteMany({username: user.username}) //may need to do in reverse
            )
            .then((user) =>
            ! user
            ? res.status(404).json({message: 'User deleted but no thoughts found'})
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
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
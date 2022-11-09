const { User, Thought } = require('../models')

module.exports = {
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .populate('thoughts') //??
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
            { _id: req.params.userId}, 
            { username: req.body.username, email: req.body.email},
            { runValidators: true, new: true},
        )
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findByIdAndRemove({_id: req.params.userId})
            .then((user) => 
                ! user
                ? res.status(404).json({message: 'no user found'})
                : Thought.deleteMany({_id: {$in: user.thoughts}}) 
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
            { _id : req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            { new: true}
        )
        .then((userData) => 
            ! userData
                ? res.status(404).json({message: 'no user found'})
                : User.findByIdAndUpdate (
                    { _id: req.params.friendId},
                    { $addToSet: {friends: req.params.userId}},
                    { new: true}
                )
        )
        .then((e) => 
            ! e
                ? res.status(404).json({message: 'friend added on one end'})
                : res.json({message: 'friend added'}))
        .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            { _id : req.params.userId},
            { $pull: {friends: req.params.friendId}},
            { new: true}
        )
        .then((userData) => 
            ! userData
                ? res.status(404).json({message: 'no user found'})
                : User.findByIdAndUpdate (
                    { _id: req.params.friendId},
                    { $pull: {friends: req.params.userId}},
                    { new: true}
                )
        )
        .then((e) => 
            ! e
                ? res.status(404).json({message: 'friend deleted on one end'})
                : res.json({message: 'friend deleted'}))
        .catch((err) => res.status(500).json(err))
    }
}
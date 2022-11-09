const router = require('express').Router();
const{
    getUsers, 
    getSingleUser, 
    createUser,
    updateUser, 
    deleteUser,
    addFriend, 
    deleteFriend 
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser) //good
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser) //good
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend) //good

module.exports = router;
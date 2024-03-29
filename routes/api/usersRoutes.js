const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    // addReaction,
    // removeReaction,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// // /api/users/:userId/reaction
// router.route('/:userId/reaction').post(addReaction);

// // /api/users/:userId/reaction/:reactionId
// router.route(':userId/reaction/:reactionId').delete(removeReaction);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
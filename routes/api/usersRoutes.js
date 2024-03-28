const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addReaction,
    removeReaction,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/reaction
router.route('/:userId/reaction').post(addReaction);

// /api/users/:userId/reaction/:reactionId
router.route(':userId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
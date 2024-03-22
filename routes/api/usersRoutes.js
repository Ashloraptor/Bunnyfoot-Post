const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    removeThought,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/thought
router.route('/:userId/thought').post(addThought);

// /api/user/:studentId/thought/:thoughtId
router.route(':studentId/thought/:thoughtId').delete(removeThought);

module.exports = router;
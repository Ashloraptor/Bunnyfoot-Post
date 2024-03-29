// ObjectId() method for converting usereId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
//addThought and removeThought

// Aggregate function to get the number of users overall
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'Bunnyfoot could not find a user with that ID' })
            }

            res.json({
                user
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user and remove them from the Thought
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Add a reaction to a user
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Bunnyfoot could not find a user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove reaction from a user
    async removeReaction(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Bunnyfoot could not find a user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Add a friend
    async addFriend(req, res) {
        console.log('You are making friends!');
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Bunnyfoot could not find a user with that ID' });
            }

            res.json(user);
        }catch (err) {
            res.status(500).json(err);
        }
    },


    //Destroy a friendship
    async removeFriend(req, res) {
        console.log('You are making enemies!');
        console.log(req.body);
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Bunnyfoot could not find a user with that ID' });
            }

            res.json(user);
        }catch (err) {
            res.status(500).json(err);
        }
    },


};
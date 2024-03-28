const { Thought, User } = require('../models');

module.exports = {
    //Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .populate('users');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('users');

            if (!thought) {
                return res.status(404).json({ message: 'Bunnyfoot could not find the braincell' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create thought
    // Associate it with a user
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            //*25
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { new: true }
              );
            //*25
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            if(!thought) {
                return res.status(404).json({ message: 'Bunnyfoot lost that trail of thought'});
            }

            await User.deleteMany({_id: { $in: thought.users }});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if(!thought) {
                return res.status(404).json({ message: 'Bunnyfoot lost that trail of thought'});
            }
            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
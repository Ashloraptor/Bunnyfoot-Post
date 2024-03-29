const { Thought, User } = require('../models');

module.exports = {
    // //Get all thoughts
    // async getThoughts(req, res) {
    //     try {
    //         const thoughts = await Thought.find()
    //             .populate('users');
    //         res.json(thoughts);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    //Get all thoughts 
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // Get a thought
    async getSingleThought(req, res) {
        try {
            // const thought = await Thought.findOne({ _id: req.params.thoughtId })
            //     .populate('users');
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.userId},
                { $addToSet: { thoughts: req.params.thoughtId}}
                // { runValidators: true, new: true }

            )

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
        const {thoughtText, username} = req.body;
        try {
            const thought = await Thought.create(
                {thoughtText, username},
                // { _id: req.params.userId},
                // { $addToSet: { thoughts: req.body}}
                );
                await User.findOneAndUpdate(
                    {username},
                    {$push: {thoughts: thought._id}},
                    {new: true}
                );
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'Bunnyfoot lost that trail of thought' });
            }

            await User.deleteMany({ _id: { $in: thought.users } });
            res.json({message:'No thoughts; head empty'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Bunnyfoot lost that trail of thought' });
            }
            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },

        //Add a reaction to a ~user~ thought
        async addReaction(req, res) {
            console.log('You are adding a reaction');
            // console.log(req.body);
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;
    
            try {
                // const thought = await Thought.findOneAndUpdate(
                //     { _id: req.params.userId },
                //     { $addToSet: { reactions: req.body } },
                //     { runValidators: true, new: true }
                // );
                const thought = await Thought.findById(thoughtId);
                if (!thought) {
                  return res.status(404).json({ message: "Thought not found" });
                }
          
                thought.reactions.push({ reactionBody, username });
                await thought.save(); 
    
                if (!thought) {
                    return res
                        .status(404)
                        .json({ message: 'Bunnyfoot lost that trail of thought' });
                }
    
                res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
        },
    
        // Remove reaction from a ~user~ thought
        async removeReaction(req, res) {
            const { thoughtId, reactionId } = req.params;
            try {
                // const thought = await Thought.findOneAndUpdate(
   
                //     { _id: req.params.userId },
                //     { $pull: { reaction: { reactionId: req.params.reactionId } } },
                //     { runValidators: true, new: true }
                // );
                const thought = await Thought.findById(thoughtId);
                if (!thought) {
                    return res
                        .status(404)
                        .json({ message: 'Bunnyfoot lost that trail of thought' });
                }
    
                thought.reactions.pull(reactionId);
                await thought.save();

                res.json({message: "Reaction deleted!"});
            } catch (err) {
                res.status(500).json(err);
            }
        },
};
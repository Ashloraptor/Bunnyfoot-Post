const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomReactions } = require('./data');
// const { getRandomName, getRandomThoughts, getRandomReactions, getRandomFriends, genRandomIndex } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //Delete collections if they exist to prevent duplicates
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let reactionCheck = await connection.db.listCollections({ name: 'reactions'}).toArray();
    if (reactionCheck.length) {
        await connection.dropCollection('reactions');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    // //Referencing Assignment 21
    // // Empty arrays for randomly generated thoughts and reactions
    // const reactions = [...getRandomReactions(5)];
    // const thoughts = [];

    // // Makes reactions array
    // const makeThought = (text) => {
    //     thoughts.push({
    //         text,
    //         username: getRandomName(),
    //         reactions: [reactions[genRandomIndex(reactions)]._id],
    //     });
    // };

    // // wait for rections tot be inserted into the database
    // await Reaction.collection.insertMany(reactions);
    // // end ref ass 21

    // Create empty array to hold users
    const users = [];


    // Loop 5 times -- add users to the users array
    for (let i = 0; i < 5; i++) {
        // Get some random thought objects using a helper function that we imported from ./data
        // const thoughts = getRandomThoughts(3);

        const username = getRandomName();
        const email = `${username}@hmail.com`
        const reactions = getRandomReactions(5);
        // const friends = getRandomFriends(2);

        users.push({
            // thoughts,
            // friends,
            username,
            email,
            // friendCount,
            // reactions,
        });
    }

    // Add users to the collection and await the results
    const userData = await User.insertMany(users);

    // Add posts to the collection and await the results
    await Thought.collection.insertOne({
        // _id,
        // thoughtText,
        // username,
        // createdAt,
        // reactions
        // _v,
        // reactionCount
        users: [...users],
      });

    // Log the seed data to indicate what should appear in the database
    // console.table(users);
    console.info('Ready to bounce!');
    process.exit(0);
});
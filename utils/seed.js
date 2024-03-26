const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomPosts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //Delete collections if they exist to prevent duplicates
    let postCheck = await connection.db.listCollections({ name: 'posts' }).toArray();
    if (postCheck.length) {
        await connection.dropCollection('posts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
        await connection.dropCollection('users');
    }

    const users = [];

    // Loop 20 times -- add users to the users array
    for (let i = 0; i < 20; i++) {
        // Get some random post objects using a helper function that we imported from ./data
        const posts = getRandomPosts(20);
        const username = getRandomName();
        users.push({
            username,
            posts,
        });
    }

    // Add users to the collection and await the results
    const userData = await User.insertMany(users);

    // Add posts to the collection and await the results
    // had to change to await Course.collection.insertOne({
    // await Posts.collection.insertOne({

    // });

    // Log the seed data to indicate what should appear in the database
    // console.table(users);
    console.info('Ready to bounce!');
    process.exit(0);
});
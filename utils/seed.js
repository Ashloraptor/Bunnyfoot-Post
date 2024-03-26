const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    const users = [];

    // Log the seed data to indicate what should appear in the database
    // console.table(users);
    console.info('Ready to bounce!');
    process.exit(0);
});
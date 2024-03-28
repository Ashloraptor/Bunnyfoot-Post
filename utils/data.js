const names = [
    'Link',
    'Zelda',
    'Rivali',
    'Mipha',
    'Urbosa',
    'Daruk',
    'Teba',
    'Tulin',
    'Sidon',
    'Riju',
    'Yunobo',
    'Purah',
    'Robbie',
    'Malon',
    'Saria',
    'Ruta',
    'Naboru',
    'Impa',
    'Paya',
];

const postDescriptions = [
    'Champions Ceremony',
    'Swimming',
    'Training',
    'Ritual',
    'Horseback Racing',
    'Hiking',
    'Spelunking',
    'Fishing',
    'Bow Hunting',
    'Bow Fishing',
    'Monster Hunting',
    'Cooking',
    'Flight Training',
    'Visit the Library',
];

const reactionResponses = [
    'That sounds like fun!',
    'Count me in!',
    'Is that dangerous?',
    'That sounds kinda scary, ngl.',
    "I don't think I have the right equipment.",
    'When do we meet up?',
    'I would need to check my schedule.',
    'That is a tentative yes from me.',
    "If I wasn't already booked, I would go.",
    "Didn't we already do that?",
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

// Function to generate random reactions that we can add to user object.
const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionName: getRandomArrItem(reactionResponses)
      });
    }
    return results;
  };

// // Function to generate random thoughts
// const getRandomThoughts = (int) => {
//     const results = [];
//     for (let i = 0; i < int; i++) {
//         results.push({
//             thoughtName: getRandomArrItem(postDescriptions)
//         });
//     }
//     return results;
// }

// Export the functions for use in seed.js
module.exports = {getRandomName, getRandomReactions};
// module.exports = {getRandomName, getRandomThoughts, getRandomReactions};
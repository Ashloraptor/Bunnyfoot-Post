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
    'Monster Hunting',
    'Cooking',
    'Flight Training',
    'Visit the Library',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

  // Function to generate random posts that we can add to user object.
const getRandomPosts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        postName: getRandomArrItem(postDescriptions)
      });
    }
    return results;
  };

  //Incorporate Reactions

// Export the functions for use in seed.js
module.exports = {getRandomName, getRandomPosts}
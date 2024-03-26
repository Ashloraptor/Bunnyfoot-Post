const names = [
    'Link',
    'Zelda',
    'Rivali',
    'Mipha',
    'Urbosa',
    'Daruk',
    'Purah',
    'Robbie',
    'Malon',
    'Saria',
    'Ruta',
    'Naboru',
    'Impa',
];

const postDescriptions = [
    'Champions Ceremony',
    'Swimming',
    'Training',
    'Ritual',
    'Horseback Racing',
    'Hiking',
    'Spelunking',
    'Fishing'
];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

  // Function to generate random assignments that we can add to student object.
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
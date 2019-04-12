
exports.seed = function(knex) {
      return knex('games').insert([
        {
          id: 1, 
          name: 'Epic Seven', 
          genre: 'JRPG', 
          year: 2018
        },
        {
          id: 2, 
          name: 'Fate Grand Order', 
          genre: 'JRPG', 
          year: 2017
        },
        {
          id: 3, 
          name: 'Fire Emblem Heroes', 
          genre: 'Turn-Based', 
          year: 2017 
        }
      ]);
};

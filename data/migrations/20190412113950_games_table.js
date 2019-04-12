
exports.up = function(knex) {
  return knex.schema.createTable('games', tbl => {
        //gives id
        tbl.increments();

        //name required
        tbl
            .string('name', 255)
            .notNullable()
            .unique();

        //genre required
        tbl
            .string('genre', 255)
            .notNullable();

        //release year not required
        tbl
            .integer('year', 255);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};

const knex = require("../knex");

knex.schema.createTable("posts", function (table) {
  table.increments("post_id").primary();
  table.enum("tag", [board_A, board_B, board_C]).notNullable();
  table.string("title").notNullable();
  table.string("description").notNullable();
  table.string("photo").notNullable();
  table.timestamps("created_time").defaultTo(knex.fn.now());
  table.timestamps("updated_time").defaultTo(knex.fn.now());
  table.foreign("user_id").references("users.user_id");
});

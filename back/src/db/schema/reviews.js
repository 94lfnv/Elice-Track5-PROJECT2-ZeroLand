const knex = require("../knex");

knex.schema.createTable("reviews", function (table) {
  table.increments("review_id").primary();
  table.integer("star").notNullable();
  table.string("description").notNullable();
  table.string("photo").notNullable();
  table.timestamps("created_time").defaultTo(knex.fn.now());
  table.timestamps("updated_time").defaultTo(knex.fn.now());
  table.foreign("user_id").references("users.user_id");
  table.foreign("store_id").references("stores.store_id");
});

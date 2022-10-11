const knex = require("../db");

knex.schema.createTable("like_store", function (table) {
  table.increments("like_store_id").primary();
  table.time("time").defaultTo(knex.fn.now());
  table.foreign("user_id").references("users.user_id");
  table.foreign("store_id").references("stores.store_id");
});

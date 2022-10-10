const knex = require("../knex");

knex.schema.createTable("like_review", function (table) {
  table.increments("like_review_id").primary();
  table.timestamps("created_time").defaultTo(knex.fn.now());
  table.string("tag"); // enum으로 가능할지 고민 필요
  table.foreign("user_id").references("users.user_id");
  table.foreign("store_id").references("stores.store_id");
});

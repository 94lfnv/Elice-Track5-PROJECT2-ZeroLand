const knex = require("../db");

knex.schema.createTable("stickers", function (table) {
  table.increments("sticker_id").primary();
  table
    .enum("tag", [
      visited_zero_waste_shop,
      visited_refill_shop,
      bought_first_zero_waste_product,
      bought_first_refill_product,
    ])
    .notNullable();
  table.timestamps("time").defaultTo(knex.fn.now());
  table.foreign("user_id").references("users.user_id");
});

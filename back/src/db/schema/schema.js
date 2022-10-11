// schema.js
const knex = require("../db");

knex.schema
  .createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("nickname").notNullable(); // 중복 허용여부관련 정책 수립 필요
    table.string("profile_photo");
    table.timestamps("created_time").defaultTo(knex.fn.now()); // .notNullable() 필요 여부, 기본값 선언이 되어 있기 때문에 고민 중
    table.timestamps("updated_time").defaultTo(knex.fn.now());
    table.string("current_latitude");
    table.string("current_longitude");
  })
  .then(() =>
    knex.schema.createTable("adress", function (table) {
      table.increments("adress_id").primary();
      table.string("si_do").notNullable();
      table.string("gu").notNullable();
      table.string("dong").notNullable();
    })
  )
  .then(() =>
    knex.schema.createTable("stores", function (table) {
      table.increments("store_id").primary();
      table.string("name").notNullable();
      table.string("description");
      table.enum("tag", [zero_waste, refill]).notNullable();
      table.string("url");
      table.intiger("phone");
      table.timestamps("open_time");
      table.timestamps("close_time");
      table.string("current_latitude");
      table.string("current_longitude");
      table.foreign("address_id").references("adress.address_id");
      table.string("address_detail");
    })
  )

  .then(() =>
    knex.schema.createTable("like_store", function (table) {
      table.increments("like_store_id").primary();
      table.time("time").defaultTo(knex.fn.now());
      table.foreign("user_id").references("users.user_id");
      table.foreign("store_id").references("stores.store_id");
    })
  )
  .then(() =>
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
    })
  )
  .then(() =>
    knex.schema.createTable("reviews", function (table) {
      table.increments("review_id").primary();
      table.integer("star").notNullable();
      table.string("description").notNullable();
      table.string("photo").notNullable();
      table.timestamps("created_time").defaultTo(knex.fn.now());
      table.timestamps("updated_time").defaultTo(knex.fn.now());
      table.foreign("user_id").references("users.user_id");
      table.foreign("store_id").references("stores.store_id");
    })
  )
  .then(() =>
    knex.schema.createTable("like_review", function (table) {
      table.increments("like_review_id").primary();
      table.timestamps("created_time").defaultTo(knex.fn.now());
      table.string("tag"); // enum으로 가능할지 고민 필요
      table.foreign("user_id").references("users.user_id");
      table.foreign("store_id").references("stores.store_id");
    })
  )
  .then(() =>
    knex.schema.createTable("posts", function (table) {
      table.increments("post_id").primary();
      table.enum("tag", [board_A, board_B, board_C]).notNullable();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.string("photo").notNullable();
      table.timestamps("created_time").defaultTo(knex.fn.now());
      table.timestamps("updated_time").defaultTo(knex.fn.now());
      table.foreign("user_id").references("users.user_id");
    })
  )
  .then(process.exit);

// 실행 node src/schema.js 하면 DB에 생성된다.

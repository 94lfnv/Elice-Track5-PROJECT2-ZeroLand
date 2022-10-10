// references:
// https://knexjs.org/guide/schema-builder.html
const knex = require("../knex");

// // public????
// knex.schema.withSchema('public').createTable('users', function (table) {
//     table.increments();
//   })

// if users 테이블이 없으면 생성
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
});
// .then(process.exit);

// Ref: A.address_id < S.address_id
// 이건 어떻게?

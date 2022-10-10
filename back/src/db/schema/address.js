const knex = require("../knex");

knex.schema.createTable("adress", function (table) {
  table.increments("adress_id").primary();
  table.string("si_do").notNullable();
  table.string("gu").notNullable();
  table.string("dong").notNullable();
});

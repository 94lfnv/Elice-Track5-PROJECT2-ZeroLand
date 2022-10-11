// references:
// https://knexjs.org/guide/schema-builder.html
const knex = require("../db");

// // public????
// knex.schema.withSchema('public').createTable('users', function (table중 {
//     table.increments();
//   })

// if users 테이블이 없으면 생성
knex.schema.createTable("users", function (table) {
  table.increments("user_id").primary();
  table.string("email").notNullable();
  table.string("password").notNullable();
  table.string("nickname").notNullable(); // 중복 허용여부관련 정책 수립 필요
  table.string("profile_photo");
  table.timestamps("created_time").defaultTo(knex.fn.now()); // .notNullable() 필요 여부, 기본값 선언이 되어 있기 때문에 고민 중
  table.timestamps("updated_time").defaultTo(knex.fn.now());
  table.string("current_latitude");
  table.string("current_longitude");
});
// .then(process.exit);

// // INTEGER
// table.integer('column_name')

// // TEXT
// table.text('column_name')

// // VARCHAR(255) (255 생략 가능)
// table.string('column_name', 255)

// // FLOAT(8, 2) (8, 2 생략 가능)
// table.float('column_name', 8, 2)

// // DECIMAL(8, 2) (8, 2 생략 가능)
// table.decimal('column_name', 8, 2)

// // 저장은 TINYINT 타입으로 되나 JS 측에서 boolean으로 사용
// table.boolean('column_name')

// // DATETIME
// table.datetime('column_name')

// // TIMESTAMP (시각과 시간대를 같이 저장하는 타입)
// table.timestamp('column_name')

// // ENUM
// table.enum('column_name', ['M', 'F'])

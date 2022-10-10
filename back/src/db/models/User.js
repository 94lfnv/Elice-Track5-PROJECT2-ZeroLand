// reference:
// 1차 프로젝트 파일
const knex = require("../knex");
// const { UserModel } = require("../schemas/user");
// import { UserModel } from "../schemas/user";

const list = (params = {}) => {
  knex(process.env.T_USERS)
    .select(
      "user_id",
      "email",
      "passowrd",
      "nickname",
      "profile_photo",
      "created_time",
      "updated_time",
      "current_latitude",
      "current_longitude"
    )
    // .where({ user_id: 1 }); // 예시
    .where(params) // 예시
    .andwhere({ "user_id",">", 0 })}; // 예시

const create = (obj) => {
  knex(process.env.T_USERS)
    .insert(obj)
};
const update = (params, obj) => {
  knex(process.env.T_USERS)
    .where(params)
    .update(obj);
};


// export { User };
module.exports = { list, create, update };

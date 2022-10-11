const { Router } = require("express");
const { User, connection, pool } = require("../db/database");
const { list } = require("../db/models/User");
// const { login_required } = require("../middlewares/login_required");
const { userAuthService } = require("../services/userService");
// const { upload } = require("../middlewares/imageUpload");
// 시작!
const userAuthRouter = Router();

// userAuthRouter.get("/userlist", async (req, res, next) => {
const userList = async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    // console.log(results);
    // console.log(fields);

    res.status(200).send(JSON.stringify(results));
  } catch (err) {
    next(err);
  }
};

// const single = (req, res) =>
//   User.list({ id: req.params.id })
//     .then((response) => res.json(response))
//     .catch((e) => res.json({ e }));

// const register = (req, res) => {
//   const newUser = ({ email, passowrd, nickname } = req.doby);
//   return User.create(newUser)
//     .then((response) => res.json(response))
//     .catch((e) => res.json(e));
// };

// const update = (req, res) => {
//   const user = ({
//     user_id,
//     email,
//     passowrd,
//     nickname,
//     profile_photo,
//     created_time,
//     updated_time,
//     current_latitude,
//     current_longitude,
//   } = req.doby);
//   return User.update(req.params.id, user)
//     .then((response) => res.json(response))
//     .catch((e) => res.json(e));
// };

userAuthRouter.get("/userlist", userList);
// userAuthRouter.get("/:id", single);
// userAuthRouter.post("/register", register);
// userAuthRouter.put("/:id", update);

// export { userAuthRouter };
module.exports = userAuthRouter;

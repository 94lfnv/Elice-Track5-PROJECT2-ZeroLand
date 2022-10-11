const { Router } = require("express");
// const { User } = require("../db/database");
// const { login_required } = require("../middlewares/login_required");
const { userAuthService } = require("../services/userService");
// const { upload } = require("../middlewares/imageUpload");

// 시작!
const userAuthRouter = Router();

// const userList = (req, res) =>
//   User.list()
//     .then((response) => res.json(response))
//     .catch((e) => res.json({ e }));

userAuthRouter.get(
  "/userlist",
  // login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const userlist = await userAuthService.getUsers();
      res.status(200).send(userlist);
    } catch (error) {
      next(error);
    }
  }
);

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

// userAuthRouter.get("/", userList);
// userAuthRouter.get("/:id", single);
// userAuthRouter.post("/register", register);
// userAuthRouter.put("/:id", update);

// export { userAuthRouter };
module.exports = userAuthRouter;

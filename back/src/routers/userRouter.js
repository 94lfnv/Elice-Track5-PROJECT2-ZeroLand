// reference:
// 1차 프로젝트

// import is from "@sindresorhus/is";
// import { Router } from "express";
// import { login_required } from "../middlewares/login_required";
// import { userAuthService } from "../services/userService";
// import { upload } from "../middlewares/imageUpload";

// const is = require("@sindresorhus/is");
const express = require("express");
// const { Router } = require("express");
// const { response } = require("../app");
const User = require("./../models/User");
// const { login_required } = require("../middlewares/login_required");
// const { userAuthService } = require("../services/userService");
// const { upload } = require("../middlewares/imageUpload");

// 시작!
const userAuthRouter = express.Router();

const list = (req, res) =>
  User.list()
    .then((response) => res.json(response))
    .catch((e) => res.json({ e }));

const single = (req, res) =>
  User.list({ id: req.params.id })
    .then((response) => res.json(response))
    .catch((e) => res.json({ e }));

const register = (req, res) => {
  const newUser = ({
    user_id,
    email,
    passowrd,
    nickname,
    profile_photo,
    created_time,
    updated_time,
    current_latitude,
    current_longitude,
  } = req.doby);
  return User.create(newUser)
    .then((response) => res.json(response))
    .catch((e) => res.json(e));
};

const update = (req, res) => {
  const user = ({
    user_id,
    email,
    passowrd,
    nickname,
    profile_photo,
    created_time,
    updated_time,
    current_latitude,
    current_longitude,
  } = req.doby);
  return User.update(req.params.id, user)
    .then((response) => res.json(response))
    .catch((e) => res.json(e));
};

userAuthRouter.get("/all", list);
userAuthRouter.get("/:id", single);
userAuthRouter.post("/register", register);
userAuthRouter.put("/:id", update);

// export { userAuthRouter };
module.exports = userAuthRouter;

const { User } = require("../db/database");
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

class userAuthService {
  static async getUsers() {
    // const users = await User.findAll();
    const users = await User.findAll();
    return users;
  }
}

module.exports = userAuthService;

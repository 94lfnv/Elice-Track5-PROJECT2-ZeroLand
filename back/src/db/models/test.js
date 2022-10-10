// reference:
// 1차 프로젝트 파일

import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findByNickname({ nickname }) {
    const user = await UserModel.findOne({ nickname });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // 정책상 nickname의 중복 혀용 여부에 따라 사용 유무 변경
  static async findByNickname({ nickname }) {
    const users = await UserModel.find({ nickname: nickname });
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { user_id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };

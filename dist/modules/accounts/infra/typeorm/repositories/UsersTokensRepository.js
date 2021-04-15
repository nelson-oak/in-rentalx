"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserToken = require("../entities/UserToken");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserToken.UserToken);
  }

  async create({
    refresh_token,
    user_id,
    expires_date
  }) {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    });
    await this.repository.save(userToken);
    return userToken;
  }

  findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.repository.findOne({
      user_id,
      refresh_token
    });
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refresh_token) {
    return this.repository.findOne({
      refresh_token
    });
  }

}

exports.UsersTokensRepository = UsersTokensRepository;
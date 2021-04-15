"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserToken = require("@modules/accounts/infra/typeorm/entities/UserToken");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }

  async create({
    refresh_token,
    expires_date,
    user_id
  }) {
    const userToken = new _UserToken.UserToken();
    Object.assign(userToken, {
      refresh_token,
      expires_date,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    return this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
  }

  async deleteById(id) {
    const userTokenIndex = this.usersTokens.findIndex(userToken => userToken.id === id);
    this.usersTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token) {
    return this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;
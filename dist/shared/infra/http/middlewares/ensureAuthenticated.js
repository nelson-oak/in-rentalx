"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("@config/auth"));

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("@shared/errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  const usersRepository = new _UsersRepository.UsersRepository();
  const {
    secret_token
  } = _auth.default;

  if (!authHeader) {
    throw new _AppError.AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, secret_token);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError("User does not exists!", 401);
    }

    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError("Invalid token!", 401);
  }
}
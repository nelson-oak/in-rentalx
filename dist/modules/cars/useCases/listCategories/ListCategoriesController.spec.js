"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)("localhost");
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`
      INSERT INTO users(id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX', NOW())
    `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list all categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest 1",
      description: "Category Supertest Description 1"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest 1");
  });
});
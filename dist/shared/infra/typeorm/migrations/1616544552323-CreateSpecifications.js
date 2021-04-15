"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecifications1616544552323 = void 0;

var _typeorm = require("typeorm");

class CreateSpecifications1616544552323 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("specifications");
  }

}

exports.CreateSpecifications1616544552323 = CreateSpecifications1616544552323;
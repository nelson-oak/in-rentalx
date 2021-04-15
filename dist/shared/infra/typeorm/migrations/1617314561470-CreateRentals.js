"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentals1617314561470 = void 0;

var _typeorm = require("typeorm");

class CreateRentals1617314561470 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "rentals",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "car_id",
        type: "uuid"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: "start_date",
        type: "timestamp",
        default: "now()"
      }, {
        name: "end_date",
        type: "timestamp",
        isNullable: true
      }, {
        name: "expected_return_date",
        type: "timestamp"
      }, {
        name: "total",
        type: "numeric",
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FKCarRental",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onUpdate: "SET NULL",
        onDelete: "SET NULL"
      }, {
        name: "FKUser",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onUpdate: "SET NULL",
        onDelete: "SET NULL"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("rentals");
  }

}

exports.CreateRentals1617314561470 = CreateRentals1617314561470;
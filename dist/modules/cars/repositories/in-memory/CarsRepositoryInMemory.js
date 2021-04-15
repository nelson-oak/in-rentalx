"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("@modules/cars/infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(name, brand, category_id) {
    const cars = this.cars.filter(car => {
      if (!car.available) {
        return false;
      }

      if (name && car.name !== name) {
        return false;
      }

      if (brand && car.brand !== brand) {
        return false;
      }

      if (category_id && car.category_id !== category_id) {
        return false;
      }

      return true;
    });
    return cars;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id, available) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;
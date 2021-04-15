"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car's Name",
      description: "Car's Description",
      daily_rate: 1234,
      license_plate: "Car's License Plate",
      fine_amount: 5678,
      brand: "Car's Brand",
      category_id: "Car's Category ID"
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a new car with an exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car's Name",
        description: "Car's Description",
        daily_rate: 1234,
        license_plate: "Car's License Plate",
        fine_amount: 5678,
        brand: "Car's Brand",
        category_id: "Car's Category ID"
      });
      await createCarUseCase.execute({
        name: "Car's Name 2",
        description: "Car's Description 2",
        daily_rate: 1234,
        license_plate: "Car's License Plate 2",
        fine_amount: 5678,
        brand: "Car's Brand",
        category_id: "Car's Category ID 2"
      });
    });
  });
  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car's Name",
      description: "Car's Description",
      daily_rate: 1234,
      license_plate: "Car's License Plate",
      fine_amount: 5678,
      brand: "Car's Brand",
      category_id: "Car's Category ID"
    });
    expect(car.available).toBe(true);
  });
});
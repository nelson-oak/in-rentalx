"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationInMemory = require("@modules/cars/repositories/in-memory/SpecificationInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecification = require("./CreateCarSpecification");

let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
let createCarSpecificationUseCase;
describe("Create Car Specification", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationInMemory.SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecification.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car's Name",
      description: "Car's Description",
      daily_rate: 1234,
      license_plate: "Car's License Plate",
      fine_amount: 5678,
      brand: "Car's Brand",
      category_id: "Car's Category ID"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification Test",
      description: "Specification Description"
    });
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id]
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
  it("should not be able to add a new specification to a non-existing car", async () => {
    const car_id = "123";
    const specifications_id = ["456"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists!"));
  });
});
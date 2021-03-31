import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecification";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car's Name",
      description: "Car's Description",
      daily_rate: 1234,
      license_plate: "Car's License Plate",
      fine_amount: 5678,
      brand: "Car's Brand",
      category_id: "Car's Category ID",
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [],
    });
  });

  it("should not be able to add a new specification to a non-existing car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["456"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car 1 Description",
      daily_rate: 140,
      license_plate: "ABC-1000",
      fine_amount: 100,
      brand: "Car 1 Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car 2 Description",
      daily_rate: 140,
      license_plate: "DEF-2000",
      fine_amount: 100,
      brand: "Car 2 Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car 2",
    });

    expect(cars).toEqual([car]);
  });
});

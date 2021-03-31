import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCars";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

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

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car 3 Description",
      daily_rate: 140,
      license_plate: "GHI-3000",
      fine_amount: 100,
      brand: "Car 3 Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car 3 Brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Car 4 Description",
      daily_rate: 140,
      license_plate: "JKL-4000",
      fine_amount: 100,
      brand: "Car 4 Brand",
      category_id: "category_id_4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id_4",
    });

    expect(cars).toEqual([car]);
  });
});

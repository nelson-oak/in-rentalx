"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description Test"
    };
    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("Should not be able to create a new category if same name from another", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description Test"
    };
    await createCategoryUseCase.execute(category);
    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
});
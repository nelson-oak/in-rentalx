import { Category } from "../models/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  create({ name, description }: ICreateCategoryDTO): void {
    console.log("Postgres Create");
  }

  list(): Category[] {
    console.log("Postgres List");

    return null;
  }

  findByName(name: string): Category {
    console.log("Postgres FindByName");

    return null;
  }
}

export { PostgresCategoriesRepository };

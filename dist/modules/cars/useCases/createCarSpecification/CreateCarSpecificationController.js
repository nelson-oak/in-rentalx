"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecification = require("./CreateCarSpecification");

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      specifications_id
    } = request.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecification.CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id
    });
    return response.json(car);
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;
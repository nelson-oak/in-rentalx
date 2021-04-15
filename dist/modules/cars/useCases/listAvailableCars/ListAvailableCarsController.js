"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCars = require("./ListAvailableCars");

class ListAvailableCarsController {
  async handle(request, response) {
    const {
      name,
      brand,
      category_id
    } = request.query;

    const listAvailableCarsUseCase = _tsyringe.container.resolve(_ListAvailableCars.ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      name: name,
      brand: brand,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;
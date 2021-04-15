"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProviderInMemory;
let sendForgotPasswordMailUseCase;
describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password email to user", async () => {
    const sendMail = spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      name: "Nelson",
      email: "nelsonDevJs@nelsonoak.dev",
      password: "123456",
      driver_license: "7890987"
    });
    await sendForgotPasswordMailUseCase.execute("nelsonDevJs@nelsonoak.dev");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("non-existing@nelsonoak.dev")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("should be able to generate a new user's token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      name: "Nelson",
      email: "nelsonDevJs@nelsonoak.dev",
      password: "123456",
      driver_license: "7890987"
    });
    await sendForgotPasswordMailUseCase.execute("nelsonDevJs@nelsonoak.dev");
    expect(generateTokenMail).toHaveBeenCalled();
  });
});
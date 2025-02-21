import { describe, it, expect, beforeAll } from "vitest";
import { CreateUser } from "@/use-cases/create-user";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import Validator from "./doubles/CreateUserValidator";
import {
  InvalidInputError,
  LoginExistsError,
  UserAlreadyLoggedError,
} from "@/use-cases/create-user/errors";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import EncoderDouble from "./doubles/EncoderDouble";

describe("Create User", () => {
  let repository: InMemoryUserRepository;
  let useCase: CreateUser;
  let validator: CreateUserInputValidator;
  let encoder: EncoderDouble;
  let sessionManager: SessionManagerDouble;

  beforeAll(() => {
    repository = new InMemoryUserRepository();
    validator = new Validator();
    encoder = new EncoderDouble();
    sessionManager = new SessionManagerDouble();
    useCase = new CreateUser(repository, validator, encoder, sessionManager);
  });

  it("should create a user correctly", async () => {
    const createdUser = await useCase.execute({
      name: "John Doe",
      login: "johndoe",
      password: "test123@",
    });

    expect(createdUser).toEqual({
      id: 1,
      name: "John Doe",
      login: "johndoe",
    });
  });

  it("should return an error if login already exists", async () => {
    const createdUser = await useCase.execute({
      name: "John Doe",
      login: "johndoe",
      password: "test123@",
    });

    expect(createdUser).toBeInstanceOf(LoginExistsError);
  });

  it("should return an error if input is invalid", async () => {
    const createdUser = await useCase.execute({
      name: "",
      login: "",
      password: "",
    });

    expect(createdUser).toBeInstanceOf(InvalidInputError);
  });

  it("should return an error if user is already logged", async () => {
    sessionManager.create({
      authenticated: true,
    });

    const createdUser = await useCase.execute({
      name: "John Doe",
      login: "johndoe",
      password: "test123@",
    });

    expect(createdUser).toBeInstanceOf(UserAlreadyLoggedError);
  });
});

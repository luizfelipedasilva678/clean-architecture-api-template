import { describe, it, expect, beforeAll } from "vitest";
import { CreateUser } from "@/use-cases/create-user";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import Validator from "./doubles/CreateUserValidator";
import {
  InvalidInputError,
  LoginExistsError,
} from "@/use-cases/create-user/errors";
import BcryptJsEncoder from "@/external/encoder/bcryptjs-encoder";

describe("Create User", () => {
  let repository: InMemoryUserRepository;
  let useCase: CreateUser;
  let validator: CreateUserInputValidator;
  let encoder: BcryptJsEncoder;

  beforeAll(() => {
    repository = new InMemoryUserRepository();
    validator = new Validator();
    encoder = new BcryptJsEncoder();
    useCase = new CreateUser(repository, validator, encoder);
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
});

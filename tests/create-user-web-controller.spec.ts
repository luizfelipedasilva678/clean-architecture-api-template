import { describe, it, expect, beforeAll } from "vitest";
import { CreateUser } from "@/use-cases/create-user";
import { CreateUserWebController } from "@/presentation/controllers";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import Validator from "./doubles/CreateUserValidator";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";
import { BcryptJsEncoder } from "@/external/encoder";

describe("Create User Web Controller", () => {
  let repository: InMemoryUserRepository;
  let useCase: CreateUser;
  let validator: CreateUserInputValidator;
  let controller: CreateUserWebController;
  let encoder: BcryptJsEncoder;

  beforeAll(() => {
    repository = new InMemoryUserRepository();
    validator = new Validator();
    encoder = new BcryptJsEncoder();
    useCase = new CreateUser(repository, validator, encoder);
    controller = new CreateUserWebController(useCase);
  });

  it("should create a user correctly", async () => {
    const response = await controller.execute({
      body: {
        login: "johndoe",
        name: "John Doe",
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "John Doe",
      login: "johndoe",
    });
  });

  it("should return an error if login already exists", async () => {
    const response = await controller.execute({
      body: {
        login: "johndoe",
        name: "John Doe",
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Login already exists",
    });
  });

  it("should return an error if input is invalid", async () => {
    const response = await controller.execute({
      body: {
        login: "johndoe",
        name: "John Doe",
        password: "test123",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("details");
  });
});

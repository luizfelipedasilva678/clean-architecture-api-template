import { SignInWebController } from "@/presentation/controllers";
import { SignIn } from "@/use-cases/sign-in";
import { describe, it, expect, beforeAll } from "vitest";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import EncoderDouble from "./doubles/EncoderDouble";

describe("Sign In Web Controller", () => {
  let controller: SignInWebController;
  let sessionManger: SessionManagerDouble;
  let repository: InMemoryUserRepository;
  let encoder: EncoderDouble;

  beforeAll(() => {
    sessionManger = new SessionManagerDouble();
    repository = new InMemoryUserRepository();
    encoder = new EncoderDouble();

    controller = new SignInWebController(
      new SignIn(repository, encoder, sessionManger)
    );
  });

  it("should return a 200 status code", async () => {
    await repository.create({
      name: "John Doe",
      login: "johndoe",
      password: "test123@",
    });

    const response = await controller.execute({
      body: {
        login: "johndoe",
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it("should return return an redirect if user is authenticated", async () => {
    sessionManger.create({
      authenticated: true,
    });

    const response = await controller.execute({
      body: {
        login: "johndoe",
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(302);
  });

  it("should return an error if input is invalid", async () => {
    const response = await controller.execute({
      body: {
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(400);
  });
});

import { expect, it, describe, beforeAll } from "vitest";
import { SignIn } from "@/use-cases/sign-in";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import EncoderDouble from "./doubles/EncoderDouble";

describe("Sign In", () => {
  let repository: InMemoryUserRepository;
  let useCase: SignIn;
  let encoder: EncoderDouble;
  let sessionManager: SessionManagerDouble;

  beforeAll(() => {
    repository = new InMemoryUserRepository();
    encoder = new EncoderDouble();
    sessionManager = new SessionManagerDouble();
    useCase = new SignIn(repository, encoder, sessionManager);
  });

  it("should return an error if user does not exist", async () => {
    const useCaseResult = await useCase.execute({
      login: "johndoe",
      password: "test123@",
    });

    expect(useCaseResult).toBeInstanceOf(Error);
  });

  it("should sign in a user correctly", async () => {
    await repository.create({
      name: "John Doe",
      login: "johndoe",
      password: await encoder.encode("test123@"),
    });

    const signedInUser = await useCase.execute({
      login: "johndoe",
      password: "test123@",
    });

    expect(signedInUser).toEqual({
      id: "1",
      login: "johndoe",
      authenticated: true,
    });
  });
});

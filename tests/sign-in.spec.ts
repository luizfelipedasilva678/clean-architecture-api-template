import { expect, it, describe, beforeAll } from "vitest";
import { SignIn } from "@/use-cases/sign-in";
import { BcryptJsEncoder } from "@/external/encoder";
import InMemoryUserRepository from "./doubles/InMemoryUserRepository";

describe("Sign In", () => {
  let repository: InMemoryUserRepository;
  let useCase: SignIn;
  let encoder: BcryptJsEncoder;

  beforeAll(() => {
    repository = new InMemoryUserRepository();
    encoder = new BcryptJsEncoder();
    useCase = new SignIn(repository, encoder);
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

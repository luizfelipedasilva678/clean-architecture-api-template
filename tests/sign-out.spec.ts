import { it, describe, expect, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import { SignOut } from "@/use-cases/sign-out";

describe("Sign Out", () => {
  let sessionManager: SessionManagerDouble;
  let useCase: SignOut;

  beforeAll(() => {
    sessionManager = new SessionManagerDouble();
    useCase = new SignOut(sessionManager);
  });

  it("should sign out a user correctly", async () => {
    sessionManager.create({
      authenticated: true,
      user: {
        id: "1",
        login: "test",
      },
    });

    await useCase.execute();

    expect(sessionManager.get().authenticated).toBe(false);
  });
});

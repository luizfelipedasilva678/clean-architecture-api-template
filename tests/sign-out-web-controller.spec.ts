import { SignOutWebController } from "@/presentation/controllers";
import { expect, describe, it, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import { SignOut } from "@/use-cases/sign-out";

describe("Sign Out Web Controller", () => {
  let controller: SignOutWebController;
  let sessionManager: SessionManagerDouble;

  beforeAll(() => {
    sessionManager = new SessionManagerDouble();
    controller = new SignOutWebController(new SignOut(sessionManager));
  });

  it("should sign out a user correctly", async () => {
    sessionManager.create({
      authenticated: true,
      user: {
        id: "1",
        login: "test",
      },
    });

    const response = await controller.execute();

    expect(response.statusCode).toBe(302);
    expect(sessionManager.get().authenticated).toBe(false);
  });
});

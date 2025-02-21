import { describe, it, expect, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import { GetLoggedUser } from "@/use-cases/get-logged-user";

describe("Get Logged User", () => {
  let sessionManager: SessionManagerDouble;
  let useCase: GetLoggedUser;

  beforeAll(() => {
    sessionManager = new SessionManagerDouble();
    useCase = new GetLoggedUser(sessionManager);
  });

  it("should get the logged user correctly", async () => {
    sessionManager.create({
      authenticated: true,
      user: {
        id: "1",
        login: "test",
      },
    });

    const response = await useCase.execute();
    expect(response.authenticated).toBe(true);
  });
});

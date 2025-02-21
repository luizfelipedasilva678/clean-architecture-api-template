import { describe, it, expect, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import { GetLoggedUserWebController } from "@/presentation/controllers";
import { GetLoggedUser } from "@/use-cases/get-logged-user";

describe("GetLoggedUserWebController", () => {
  let sessionManager: SessionManagerDouble;
  let controller: GetLoggedUserWebController;

  beforeAll(() => {
    sessionManager = new SessionManagerDouble();
    controller = new GetLoggedUserWebController(
      new GetLoggedUser(sessionManager)
    );
  });

  it("should get the logged user correctly", async () => {
    sessionManager.create({
      authenticated: true,
      user: {
        id: "1",
        login: "test",
      },
    });

    const response = await controller.execute();

    expect(response.statusCode).toBe(200);
    expect(response.body.authenticated).toBe(true);
  });
});

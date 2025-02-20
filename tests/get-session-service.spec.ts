import { SessionManager } from "@/presentation/ports";
import { GetSessionService } from "@/presentation/services";
import { expect, it, describe, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";

describe("Sign Out", () => {
  let sessionManger: SessionManager;
  let service: GetSessionService;

  beforeAll(() => {
    sessionManger = new SessionManagerDouble();
    service = new GetSessionService(sessionManger);
  });

  it("it should get the session correctly", async () => {
    const response = await service.execute();

    expect(response.body).toHaveProperty("authenticated");
    expect(response.statusCode).toBe(200);
  });

  it("it should get the session correctly", async () => {
    sessionManger.create({
      authenticated: true,
      user: {
        id: "1",
        login: "test",
      },
    });

    const response = await service.execute();

    expect(response.body).toHaveProperty("authenticated");
    expect(response.body).toHaveProperty("user");
    expect(response.statusCode).toBe(200);
  });
});

import { SessionManager } from "@/presentation/ports";
import { expect, it, describe, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";
import { WelcomeMessageWebService } from "@/presentation/services";

describe("Welcome Message Service", () => {
  let sessionManger: SessionManager;
  let service: WelcomeMessageWebService;

  beforeAll(() => {
    sessionManger = new SessionManagerDouble();
    service = new WelcomeMessageWebService(sessionManger);
  });

  it("should show the welcome message with visitor when user is not authenticated", async () => {
    sessionManger.create({
      authenticated: false,
    });

    const response = await service.execute();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello, visitor");
  });

  it("should show the welcome message with user name when authenticated", async () => {
    sessionManger.create({
      authenticated: true,
      user: {
        id: "1",
        login: "johndoe",
      },
    });

    const response = await service.execute();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello, johndoe");
  });
});

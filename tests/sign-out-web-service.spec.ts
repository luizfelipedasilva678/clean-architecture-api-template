import { SessionManager } from "@/presentation/ports";
import { SignOutWebService } from "@/presentation/services";
import { expect, it, describe, beforeAll } from "vitest";
import SessionManagerDouble from "./doubles/SessionManagerDouble";

describe("Sign Out", () => {
  let sessionManger: SessionManager;
  let service: SignOutWebService;

  beforeAll(() => {
    sessionManger = new SessionManagerDouble();
    service = new SignOutWebService(sessionManger);
  });

  it("should sign out a user", async () => {
    sessionManger.create({
      authenticated: true,
    });

    const response = await service.execute();

    expect(response.statusCode).toBe(302);
  });
});

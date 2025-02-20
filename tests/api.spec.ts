import routesV1 from "@/main/config/setupV1Routes";
import Fastify, { type FastifyInstance } from "fastify";
import { describe, it, expect, beforeAll } from "vitest";
import "dotenv/config";
import { setupTestDB } from "./helpers";

describe("Rest API", () => {
  const app: FastifyInstance = Fastify();

  beforeAll(async () => {
    await setupTestDB();
    app.register(routesV1, { prefix: "api/v1" });
  });

  it("should create a user correctly", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        name: "Jdsdasd",
        login: "tests",
        password: "test123@",
      },
    });

    expect(response.statusCode).toBe(201);
  });

  it("should return an error given that login already exists", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        name: "Jdsdasd",
        login: "tests",
        password: "test123@",
      },
    });

    const message = JSON.parse(response.body).message;

    expect(message).toBe("Login already exists");
    expect(response.statusCode).toBe(400);
  });

  it("should return an error given that input is invalid", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/users",
      body: {
        name: "Jdsdasd",
        login: "tests3",
        password: "test123",
      },
    });

    const message = JSON.parse(response.body).message;

    expect(message).toBe("Invalid input for create user");
    expect(response.statusCode).toBe(400);
  });
});

import routesV1 from "@/main/config/routesV1";
import { fastify, type FastifyInstance } from "fastify";
import { describe, it, expect, beforeAll } from "vitest";
import "dotenv/config";
import { setupTestDB } from "./helpers";
import fastifyCookie from "@fastify/cookie";
import { fastifySession } from "@fastify/session";

process.env.ENVIRONMENT = "test";

describe("Rest API", () => {
  const app: FastifyInstance = fastify();

  beforeAll(async () => {
    await setupTestDB();
    app.register(fastifyCookie);
    app.register(fastifySession, {
      cookieName: "sessionId",
      secret: process.env.COOKIE_SECRET ?? "simple-secret",
      cookie: { maxAge: 1800000, secure: false },
    });
    app.register(routesV1, { prefix: "/api/v1" });
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

  it("should login correctly", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      body: {
        login: "tests",
        password: "test123@",
      },
    });

    const body = JSON.parse(response.body);

    expect(response.headers).toHaveProperty("set-cookie");
    expect(body).toEqual({
      authenticated: true,
      id: "1",
      login: "tests",
    });
  });

  it("should log out correctly", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/sign-out",
    });

    expect(response.statusCode).toBe(302);
  });

  it("should return an error if password or login is invalid", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/sign-in",
      body: {
        login: "tests",
        password: "test123",
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it("should show the welcome message", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/",
    });

    const message = JSON.parse(response.body).message;

    expect(message).toBe("Hello, visitor");
    expect(response.statusCode).toBe(200);
  });
});

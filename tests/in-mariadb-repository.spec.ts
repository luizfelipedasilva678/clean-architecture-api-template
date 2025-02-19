import "dotenv/config";

import { InMariaDBRepository } from "@/external/repositories";
import { expect, it, describe, beforeAll } from "vitest";
import MySqlHelper from "@/external/helpers/mysql-helper";
import { setupTestDB } from "./helpers";

process.env.ENVIRONMENT = "test";

describe("InMariaDBRepository", () => {
  let repository: InMariaDBRepository;

  beforeAll(async () => {
    await setupTestDB();
    repository = new InMariaDBRepository(await MySqlHelper.getConnection());
  });

  it("should create a user correctly", async () => {
    const user = await repository.create({
      name: "John Doe",
      login: "johndoe",
      password: "test123@",
    });

    expect(user).toEqual({ id: 1, name: "John Doe", login: "johndoe" });
  });

  it("should throw an error if login already exists", async () => {
    try {
      await repository.create({
        name: "John Doe",
        login: "johndoe",
        password: "test123@",
      });

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

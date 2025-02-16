import { it, expect, describe } from "vitest";
import { User } from "../src/entities";

describe("User", () => {
  it("should create a user with default values correctly", () => {
    const sut = new User();

    expect(sut.getId()).toBe(0);
    expect(sut.getName()).toBe("");
    expect(sut.getLogin()).toBe("");
    expect(sut).toBeInstanceOf(User);
  });

  it("should create a user with default values correctly", () => {
    const sut = new User(1, "John Doe", "johndoe");

    expect(sut.getId()).toBe(1);
    expect(sut.getName()).toBe("John Doe");
    expect(sut.getLogin()).toBe("johndoe");
    expect(sut).toBeInstanceOf(User);
  });
});

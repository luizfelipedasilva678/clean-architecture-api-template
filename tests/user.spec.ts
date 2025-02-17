import { it, expect, describe } from "vitest";
import { User } from "@/entities";

describe("User", () => {
  it("should create a user with default values correctly", () => {
    const sut = new User();

    expect(sut.getId()).toBe(0);
    expect(sut.getName()).toBe("");
    expect(sut.getLogin()).toBe("");
    expect(sut.getPassword()).toBe("");
    expect(sut).toBeInstanceOf(User);
  });

  it("should create a user with default values correctly", () => {
    const sut = new User(1, "John Doe", "johndoe", "asfdasdfsadfsadf");

    expect(sut.getId()).toBe(1);
    expect(sut.getName()).toBe("John Doe");
    expect(sut.getLogin()).toBe("johndoe");
    expect(sut.getPassword()).toBe("asfdasdfsadfsadf");
    expect(sut).toBeInstanceOf(User);
  });
});

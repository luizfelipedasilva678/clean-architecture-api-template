import { ZodCreateUserInputValidator } from "@/external/validators";
import { describe, it, expect } from "vitest";

describe("ZodCreateUserInputValidator", () => {
  it("should return no errors", () => {
    const sut = new ZodCreateUserInputValidator();
    const input = {
      name: "John Doe",
      login: "johndoe",
      password: "test1231@",
    };

    const result = sut.validate(input);

    expect(result).toEqual([]);
  });

  it("should return errors for invalid input", () => {
    const sut = new ZodCreateUserInputValidator();
    const input = {
      name: "John Doe",
      login: "johndoe",
      password: "test1231",
    };

    const result = sut.validate(input);

    expect(result.length).toBeGreaterThan(0);
  });
});

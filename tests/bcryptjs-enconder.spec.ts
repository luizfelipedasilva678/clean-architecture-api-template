import BcryptJsEncoder from "@/external/encoder/bcryptjs-encoder";
import { describe, it, expect } from "vitest";

describe("BcryptJsEncoder", () => {
  it("should encode a password correctly", async () => {
    const sut = new BcryptJsEncoder();
    const password = "test123@";

    const result = await sut.encode(password);

    expect(result).not.toBe(password);
  });
});

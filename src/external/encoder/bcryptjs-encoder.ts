import type { Encoder } from "@/use-cases/ports";
import { genSalt, hash, compare as bcryptjsCompare } from "bcryptjs";

class BcryptJsEncoder implements Encoder {
  public async encode(password: string): Promise<string> {
    const salt = await genSalt(Number(process.env.ROUNDS));

    return hash(password, salt);
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return bcryptjsCompare(password, hash);
  }
}

export default BcryptJsEncoder;

import type { Encoder } from "@/use-cases/ports";
import { genSalt, hash } from "bcryptjs";

class BcryptJsEncoder implements Encoder {
	public async encode(password: string): Promise<string> {
		const salt = await genSalt(Number(process.env.ROUNDS));

		return hash(password, salt);
	}
}

export default BcryptJsEncoder;

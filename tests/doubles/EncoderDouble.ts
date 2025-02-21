import { Encoder } from "@/use-cases/ports";

class EncoderDouble implements Encoder {
  public encode(password: string): Promise<string> {
    return Promise.resolve(password);
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return Promise.resolve(password === hash);
  }
}

export default EncoderDouble;

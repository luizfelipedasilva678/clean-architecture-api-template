interface Encoder {
  encode: (password: string) => Promise<string>;
  compare: (password: string, hash: string) => Promise<boolean>;
}

export default Encoder;

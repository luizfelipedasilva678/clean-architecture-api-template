interface Encoder {
	encode: (password: string) => Promise<string>;
}

export default Encoder;

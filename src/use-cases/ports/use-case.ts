interface UseCase<T, R> {
	execute: (input: T) => Promise<R>;
}

export default UseCase;

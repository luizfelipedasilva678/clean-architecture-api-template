import type {
	InvalidInputError,
	LoginExistsError,
} from "../create-user/errors";

interface UseCase<T, R> {
	execute: (input: T) => Promise<R | LoginExistsError | InvalidInputError>;
}

export default UseCase;

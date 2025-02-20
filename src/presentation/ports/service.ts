interface Service<T, R> {
	execute(request: T): Promise<R>;
}

export default Service;

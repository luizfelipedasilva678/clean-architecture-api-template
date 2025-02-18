interface Controller<T, R> {
  execute(request: T): Promise<R>;
}

export default Controller;

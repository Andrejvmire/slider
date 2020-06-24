interface IIterable<T> {
    [Symbol.iterator](): Generator<T>;
}
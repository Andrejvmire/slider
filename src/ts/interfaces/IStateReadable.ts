interface IStateReadable extends IPublisher {
    getState(): IterableIterator<[string,any]>
    getState(fieldName: string): any;
}
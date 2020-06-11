interface IPoint extends IModelPublisher {
    moveTo(point: number): void;
    state: number;
}
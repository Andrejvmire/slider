interface ISlider extends IModelPublisher {
    move(to: number, from?: number): ISlider;
}
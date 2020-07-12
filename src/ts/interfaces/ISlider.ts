interface ISlider extends IModelPublisher, ISubscriber {
    move(to: number, from: number): ISlider;
}

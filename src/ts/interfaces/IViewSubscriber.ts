interface IViewSubscriber extends ISubscriber {
    update(value: number | number[]):void;
}
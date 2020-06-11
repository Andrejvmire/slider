interface IPoints extends IModelPublisher {
    state: number[];
    move(to: number, from?:number): IPoints;
}
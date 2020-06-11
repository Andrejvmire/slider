interface IPoints extends IModel {
    move(to: number, from?:number): IPoints;
}
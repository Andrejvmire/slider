import Point from "../../src/ts/models/PointModel";

describe("Point class", function () {
    describe("Success tests", () => {
        beforeEach(() => {
            this.point = new Point(55);
        })
        it('should return value', () => {
            expect(
                this.point.state
            )
                .toStrictEqual(55)
        });
    });
    describe("Реализация функций оповещения подписчика", function () {
        let point: IModelPublisher & IPoint,
            subscriber = {
                update: jest.fn(x => x)
            };
        beforeEach(() => {
            point = new Point(20);

            point.attach(subscriber);
        });
        it("Должен перемстить точку на позицию 80", function () {
            point.moveTo(80);
            expect(subscriber.update.mock.results[0].value)
                .toBe(80);
        });
    })
})
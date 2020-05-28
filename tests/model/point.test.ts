import Point from "../../src/ts/models/PointModel";

describe("Point class", function () {
    describe("Success tests", () => {
        beforeEach(() => {
            this.point = new Point(55);
        })
        it('should return value', () => {
            expect(
                this.point.value
            )
                .toStrictEqual({point: 55})
        });
    })
})
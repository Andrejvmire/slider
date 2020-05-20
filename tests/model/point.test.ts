import Point from "../../src/ts/models/Point";

describe("Point class", function () {
    describe("Success tests", () => {
        beforeEach(() => {
            this.point = new Point(55);
        })
        it('should return value', () => {
            expect(
                this.point.value
            )
                .toStrictEqual(55)
        });
    })
})
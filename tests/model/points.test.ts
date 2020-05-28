import Points from "../../src/ts/models/PointsModel";

describe("Class 'Points'", function () {
    describe('Exceptions', function () {
        it('should stend on', function () {
            expect(
                (new Points(55)).nextTo(54, 55).value
            )
                .toStrictEqual({points: [55]})
        });
    })
    describe("Success", () => {
        it('should create one point', () => {
            expect(
                (new Points(6)).value
            )
                .toStrictEqual({points: [6]});
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).nextTo(55, 56).value
            )
                .toStrictEqual({points: [56]})
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).nextTo(55, 54).value
            )
                .toStrictEqual({points: [54]})
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).nextTo(55,50).value
            )
                .toStrictEqual({points: [50]})
        });
    })
})
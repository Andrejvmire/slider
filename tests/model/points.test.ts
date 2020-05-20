import Points from "../../src/ts/models/Points";

describe("Class 'Points'", function () {
    describe('Exceptions', function () {
        it('should stend on', function () {
            expect(
                (new Points(55)).nextPoint(54).values()
            )
                .toStrictEqual([55])
        });
    })
    describe("Success", () => {
        it('should create one point', () => {
            expect(
                (new Points(6)).values()
            )
                .toStrictEqual([6]);
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).nextPoint(55).values()
            )
                .toStrictEqual([56])
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).prevPoint(55).values()
            )
                .toStrictEqual([54])
        });
        it('should move on next point', () => {
            expect(
                (new Points(55)).prevPoint(55,5).values()
            )
                .toStrictEqual([50])
        });
    })
})
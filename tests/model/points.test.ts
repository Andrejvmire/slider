import Points from "../../src/ts/models/PointsModel";

describe("Class 'Points'", function () {
    describe("Success", () => {
        it('Должен создать одну точку', () => {
            expect(
                (new Points(6)).value
            )
                .toStrictEqual({points: [6]});
        });
        it('Должен переместить точку с 55 на 56', () => {
            expect(
                (new Points(55)).moveTo(55, 56).value
            )
                .toStrictEqual({points: [56]})
        });
        it('Должен переместить точку с 55 на 54', () => {
            expect(
                (new Points(55)).moveTo(55, 54).value
            )
                .toStrictEqual({points: [54]})
        });
    })
})
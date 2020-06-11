import RulerModel from "../../src/ts/models/RulerModel";

describe("Модель RulerModel", function () {
    let ruler: IRuler;
    beforeEach(() => {
        ruler = new RulerModel([30, 140])
    });
    it('Должен вернуть объект состояния', function () {
        expect(ruler.state)
            .toStrictEqual({min: 30, max: 140})
    });
})
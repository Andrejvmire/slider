import "reflect-metadata";
import SliderModelValidator from "../../src/ts/model/Validator/SliderModelValidator";

describe("Тест валидатора модели", function () {
    const validator = new SliderModelValidator(),
        object: TModelOptions = {
            "min": -4,
            "max": 103,
            "step": 2,
            "from": -5,
            "to": 67,
        };
    beforeEach(() => {
        validator.more("from", "min", object);
        validator.less("from", "to", object);
        validator.multiple("from", "step", object, "min");

        validator.more("to", "from", object);
        validator.less("to", "max", object);
        validator.multiple("to", "step", object, "min");
    });

    it('должен привести к минимальному значению', () => {
        expect(object).toMatchObject({from: -4});
    });

    it('должен учесть значение шага', () => {
        expect(object).toMatchObject({to: 68})
    });

    it('должен пересчитать с учетом нового значения шага', () => {
        object.step = 5;
        validator.multiple("from", "step", object, "min");
        validator.multiple("to", "step", object, "min");
        expect(object).toMatchObject({from: -4, to: 66});
    })
})
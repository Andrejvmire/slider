import SliderModel from "../../src/ts/model/SliderModel";

describe("Тесты интерфейса модели", function () {
    const dataObject: TModelOptions = {
        min: -4,
        max: 123,
        step: 10,
        to: 98
    };
    const sliderModel = new SliderModel(dataObject);
    describe("Тесты для модели с 1-м бегунком", () => {
        // beforeAll(() => {
        //     sliderModel = new SliderModel(dataObject);
        // })
        it("", () => {
            // expect(String(sliderModel)).toBe('');
        })
    })
})
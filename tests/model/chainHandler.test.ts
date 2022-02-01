import MinScaleChainHandler from "../../src/ts/model/MinScaleChainHandler";
import MaxScaleChainHandler from "../../src/ts/model/MaxScaleChainHandler";
import StepScaleChainHandler from "../../src/ts/model/StepScaleChainHandler";
import FromScaleChainHandler from "../../src/ts/model/FromScaleChainHandler";
import ToScaleChainHandler from "../../src/ts/model/ToScaleChainHandler";

describe("Тест цепочки обязательств", function () {
    const repository = {
            set: jest.fn(),
            get: jest.fn(),
            rollback: jest.fn(),
            acceptValues: jest.fn()
        },
        min = new MinScaleChainHandler(repository),
        max = new MaxScaleChainHandler(repository),
        step = new StepScaleChainHandler(repository),
        from = new FromScaleChainHandler(repository),
        to = new ToScaleChainHandler(repository);
    min.setNext(max).setNext(step).setNext(from).setNext(to);

    it('set должена быть вызвана 3 раза', () => {
        const req = {min: 2, max: 99, step: 3};
        expect(min.handle(req)).toBeTruthy();
        expect(repository.set.mock.calls.length).toBe(3);
    });

    it('должен принять новое значение', () => {
        const req = {to: 22};
        expect(min.handle(req)).toBeTruthy();
    });
})
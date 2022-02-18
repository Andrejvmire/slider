import "reflect-metadata";
import MinScaleChainHandler from "../../src/ts/model/MinScaleChainHandler";
import MaxScaleChainHandler from "../../src/ts/model/MaxScaleChainHandler";
import StepScaleChainHandler from "../../src/ts/model/StepScaleChainHandler";
import FromScaleChainHandler from "../../src/ts/model/FromScaleChainHandler";
import ToScaleChainHandler from "../../src/ts/model/ToScaleChainHandler";
import {container} from "tsyringe";
import Mocked = jest.Mocked;

describe("Тест цепочки обязательств", function () {
    const mockRepository = {
            set: jest.fn(),
            get: jest.fn(),
            rollback: jest.fn(),
            acceptValues: jest.fn()
        },
        mockValidator = {
            less: jest.fn(),
            more: jest.fn(),
            multiple: jest.fn()
        };

    let min: IChainHandler<TModelOptions>,
        max: IChainHandler<TModelOptions>,
        step: IChainHandler<TModelOptions>,
        from: IChainHandler<TModelOptions>,
        to: IChainHandler<TModelOptions>,
        repository: Mocked<IRepository<TModelOptions>>;

    beforeAll(() => {
        container.reset();
        container.register("IRepository", {useValue: mockRepository});
        repository = container.resolve("IRepository");
        container.register("IValidator", {useValue: mockValidator});
    });

    it("не вызывает исключения при инициализации", () => {
        expect(() => {
            min = container.resolve(MinScaleChainHandler);
            max = container.resolve(MaxScaleChainHandler);
            step = container.resolve(StepScaleChainHandler);
            from = container.resolve(FromScaleChainHandler);
            to = container.resolve(ToScaleChainHandler);
            min.setNext(max).setNext(step).setNext(from).setNext(to);
        }).not.toThrowError();
    })

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
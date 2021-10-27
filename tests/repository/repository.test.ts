import RepositoryWithSubscribe from "../../src/ts/model/repository/RepositoryWithSubscribe";
import Publisher from "../../src/ts/model/Publisher";

describe("Тесты для репозитория", function () {
    let repository: IRepository<keyof TModelOptions, number>;
    const publisher: IPublisher = new Publisher(),
        subscriber_1 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        },
        subscriber_2 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        };
    publisher.attach(subscriber_1, "apply");
    publisher.attach(subscriber_2, "apply");
    it('Должен не вызывать ошибку при создании', () => {
        expect(() => {
            repository = new RepositoryWithSubscribe(publisher, [["min", 0]]);
        }).not.toThrowError();
    });
    it('Должен оповещать подписчиков', () => {
        repository.set("min", 21).acceptValues();
        expect(subscriber_1.update).toHaveBeenCalledTimes(1);
        expect(subscriber_2.update).toHaveBeenCalledTimes(1);
        repository.set("max", 134).acceptValues();
        expect(subscriber_1.update).toHaveBeenCalledTimes(2);
        expect(subscriber_2.update).toHaveBeenCalledTimes(2);
    });
    describe("Возвращать объект Map с данными", () => {
        const map = new Map([["min", 21], ["max", 134]]);
        it('сохраненными на данный момент', () => {
            expect(repository.get()).toEqual(map);
        });
        it('с внесенными изменениями', () => {
            expect(repository.set("from", 33).get()).toEqual(
                new Map([...map.entries(), ["from", 33]])
            );
        });
        it('и старые значения после отмены изменений', () => {
            repository.rollback();
            expect(repository.get())
                .toEqual(map);
        });
        it('и вызов функции acceptValues() при отсутствии изменений не вызовет изменений', () => {
            expect(repository.acceptValues().get()).toEqual(map);
        });
    });
    describe("Возвращает значение", () => {
        it('существующее', function () {
            expect(repository.get("min")).toEqual(21)
        });
        it('или undefined', function () {
            expect(repository.get("step")).toBeUndefined();
        });
    })
})
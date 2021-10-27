import Publisher from "../../src/ts/model/Publisher";

describe("Тест издателя", function () {
    const subscriber_1 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        },
        subscriber_2 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        },
        publisher: IPublisher = new Publisher(),
        error: TPublisher = "error",
        type: TPublisher = "apply";
    it('Отписываем несуществующего подписчика', () => {
        expect(() => publisher.detach(subscriber_1, error)).not.toThrowError();
    });
    it("Выполнение подписки на издателя", () => {
        publisher.attach(subscriber_1, type);
        expect(publisher).toMatchSnapshot();
    });
    it('Оповещает подписчика', () => {
        publisher.notify(type);
        expect(subscriber_1.update.mock.calls).toEqual([["apply"]]);
    });
    it('Пытаемся подписаться еще раз', () => {
        publisher.attach(subscriber_1, type);
        expect(publisher).toMatchSnapshot();
    });
    it('Добавляем еще одного (другого) подписчика', () => {
        publisher.attach(subscriber_2, type);
        expect(publisher).toMatchSnapshot();
    });
    it('Оповещаем несколько групп', () => {
        expect(() => publisher.notify(["error", "apply", "change"]))
            .not.toThrowError();
    });
    it('Выполнит отписку 1-го', () => {
        publisher.detach(subscriber_1, type);
        expect(publisher).toMatchSnapshot();
    });
    it('Выполнит отписку 2-го', () => {
        publisher.detach(subscriber_2, type);
        expect(publisher).toMatchSnapshot();
    });
})
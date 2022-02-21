import "reflect-metadata";
import Publisher from "../../src/ts/model/Publisher";
import {container} from "tsyringe";

describe("Тест издателя", function () {
    const subscriber_1 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        },
        subscriber_2 = {
            update: jest.fn((publisher: TPublisher) => publisher)
        },
        error: TPublisher = "error",
        type: TPublisher = "apply";
    let publisher: IPublisher;
    it("Создаем без ошибки", () => {
        expect(() => {
            container.register("IPublisher", Publisher);
            publisher = container.resolve<IPublisher>("IPublisher");
        }).not.toThrowError();
    })
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
    it("Подписываем сразу на 2 типа рассылки", () => {
        publisher.attach(subscriber_1, [type, error]);
        expect(publisher).toMatchSnapshot();
    })
})
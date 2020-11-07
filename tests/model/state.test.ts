import ModelState from "../../src/ts/models/ModelState";

describe("State class", function () {
    const initState = {"points": [23, 300], "ruler": [20, 400]};
    let state: IState;
    describe("Корректные данные", function () {
        beforeEach(() => {
            state = new ModelState(initState);
        })
        it('вернет состояние', function () {
            expect(
                Array.from(state.getState())
            )
               .toStrictEqual([["points", [23, 300]], ["ruler", [20, 400]]])
        });
        it('вернет состояние без изменений при не корректных данных', function () {
            state.setState("points", [9, 350])
            expect(
                Array.from(state.getState())
            )
                .toStrictEqual([["points", [23, 300]], ["ruler", [20, 400]]])
        });
    })
    describe("Подписываемся на изменения в объекте состояния", function () {
        let recorder: IStateWriteable;
        let reader = {
            update: jest.fn(x => x)
        };
        beforeEach(() => {
            state = new ModelState(initState);
            // Объект recorder может вносить изменения в состояние
            recorder = state;
            state.attach(reader);
        })
        it('вернет измененное состояние', function () {
            recorder.setState("points", [65, 356]);
            expect(
                Array.from(reader.update.mock.results[0].value)
            )
                .toStrictEqual([["points", [65, 356]], ["ruler", [20, 400]]])
        });

    })
})
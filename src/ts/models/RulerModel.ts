export default class RulerModel implements IModel {
    private readonly _state: IStateWriteable;
    private readonly _fieldName: string = "ruler";

    constructor(stateObject: IStateWriteable, options: RulerType) {
        this._state = stateObject;
        this._state.setState(this._fieldName, options);
    }
}
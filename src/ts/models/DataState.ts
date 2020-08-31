import Singleton from "./Singleton";

export default class DataState extends Singleton {
    protected _state: any = {};

    setState(fieldName: string, value: any): DataState {
        this._state[fieldName] = value;
        return this;
    }

    getState(fieldName?: string): any {
        if (typeof fieldName === "undefined") {
            return this._state;
        }
        return this._state[fieldName];
    }
}

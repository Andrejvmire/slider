export default class Singleton {
    private static _instance: any;

    protected constructor() {
    }

    static get instance(): any {
        if (typeof Singleton._instance === "undefined") {
            Singleton._instance = new this;
        }
        return Singleton._instance;
    }
}
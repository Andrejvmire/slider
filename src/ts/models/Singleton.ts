export default class Singleton {
    private static _instance: Singleton;

    protected constructor() {
    }

    static get instance(): Singleton {
        if (typeof Singleton._instance === "undefined") {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}
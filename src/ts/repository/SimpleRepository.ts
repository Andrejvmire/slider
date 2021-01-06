class SimpleRepository {
    protected static _repository: Map<string, any>;

    private constructor() {}

    public static init(): Map<string, any> {
        if (typeof SimpleRepository._repository === "undefined") {
            SimpleRepository._repository = new Map();
        }
        return SimpleRepository._repository;
    }
}
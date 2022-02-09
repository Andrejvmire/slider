import RepositoryWithSubscribe from "./repository/RepositoryWithSubscribe";
import Publisher from "./Publisher";
import MinScaleChainHandler from "./MinScaleChainHandler";
import MaxScaleChainHandler from "./MaxScaleChainHandler";
import FromScaleChainHandler from "./FromScaleChainHandler";
import ToScaleChainHandler from "./ToScaleChainHandler";
import StepScaleChainHandler from "./StepScaleChainHandler";
import SliderModelValidator from "./Validator/SliderModelValidator";

class SliderModel implements ISubscriber {
    private entryPoint: IChainHandler<TModelOptions>;

    private repository: IRepository<TModelOptions>;

    constructor(dataObject: TModelOptions) {
        this.init(dataObject);
        this.handle(dataObject);
    }

    private init(dataObject: TModelOptions): void {
        const publisher = new Publisher();
        publisher.attach(this, ["apply", "error"]);
        this.repository = new RepositoryWithSubscribe(publisher);
        const validator: IValidator<TModelOptions> = new SliderModelValidator();
        const min = new MinScaleChainHandler(this.repository, validator),
            max = new MaxScaleChainHandler(this.repository, validator),
            from = new FromScaleChainHandler(this.repository, validator),
            to = new ToScaleChainHandler(this.repository, validator),
            step = new StepScaleChainHandler(this.repository, validator);
        step.setNext(min)
            .setNext(max)
            .setNext(from)
            .setNext(to);
        this.entryPoint = step;
    }

    public handle(dataObject: Partial<TModelOptions>): boolean {
        return this.entryPoint.handle(dataObject);
    }

    public update(publisher: TPublisher): void {
        console.log(Object.fromEntries(this.repository.get()));
    }

}

export default SliderModel;
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

    constructor(dataObject: TModelOptions) {
        this.init(dataObject);
    }

    private init(dataObject: TModelOptions): void {
        const publisher = new Publisher();
        publisher.attach(this, ["change", "apply"]);
        const repository: IRepository<TModelOptions> = new RepositoryWithSubscribe(publisher);
        const validator: IValidator<TModelOptions> = new SliderModelValidator();
        const min = new MinScaleChainHandler(repository, validator),
            max = new MaxScaleChainHandler(repository, validator),
            from = new FromScaleChainHandler(repository, validator),
            to = new ToScaleChainHandler(repository, validator),
            step = new StepScaleChainHandler(repository, validator);
        step.setNext(min)
            .setNext(max)
            .setNext(from)
            .setNext(to);
        this.entryPoint = step;
        this.handle(dataObject);
    }

    public handle(dataObject: Partial<TModelOptions>) {
        this.entryPoint.handle(dataObject);
    }

    update(publisher: TPublisher): void {
        console.log(publisher);
    }
}

export default SliderModel;
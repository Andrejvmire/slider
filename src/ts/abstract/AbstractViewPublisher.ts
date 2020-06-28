import AbstractPublisher from "./AbstractPublisher";

export default abstract class AbstractViewPublisher extends AbstractPublisher implements IViewPublisher {
    protected $_instance: JQuery;

    get $instance(): JQuery {
        return this.$_instance;
    }
}
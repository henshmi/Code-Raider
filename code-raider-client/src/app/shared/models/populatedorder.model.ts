import { CodeBaseModel } from './code-base-model.model';

export class PopulatedOrderModel {
    public _id;
    public codebase: CodeBaseModel;

    constructor(
    ) {
        this.codebase = new CodeBaseModel();
    }
}

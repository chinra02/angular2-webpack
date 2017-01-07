import { BaseActionModel } from './base-action.model';

export class SmartTableActionModel {

    private bulkActionModel: BulkActionModel;
    private headerActionModel: HeaderActionModel;
    private rowActionModel: RowActionModel;

    public get $headerActionModel(): HeaderActionModel {
        return this.headerActionModel;
    }

    public set $headerActionModel(value: HeaderActionModel) {
        this.headerActionModel = value;
    }

    public get $rowActionModel(): RowActionModel {
        return this.rowActionModel;
    }

    public set $rowActionModel(value: RowActionModel) {
        this.rowActionModel = value;
    }


    public get $bulkActionModel(): BulkActionModel {
        return this.bulkActionModel;
    }

    public set $bulkActionModel(value: BulkActionModel) {
        this.bulkActionModel = value;
    }


}

export class BulkActionModel extends BaseActionModel {

}

export class HeaderActionModel extends BaseActionModel {

}

export class RowActionModel extends BaseActionModel {

}


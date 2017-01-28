import { BaseActionModel } from './base-action.model';
import { SmartTableDetailActionModel } from './smart-table-detail-action.model';
export class SmartTableActionParams {
    public bulkActionParams: BulkActionParams = new BulkActionParams();
    public actionValidationParams: ActionValidationParams = new ActionValidationParams();
    public rowActionParams: RowActionParams = new RowActionParams();
    public headerActionParams: HeaderActionParams = new HeaderActionParams();


}

export class BaseActionParams {
    message: string;
    selectedRows: Array<Object>;

    getAction() {
        return null;
    }
}


export class BulkActionParams extends BaseActionParams {
    selectedBulkAction: SmartTableDetailActionModel;

    getAction() {
        return this.selectedBulkAction;
    }
}

export class RowActionParams extends BaseActionParams {
    selectedRowAction: SmartTableDetailActionModel;

    getAction() {
        return this.selectedRowAction;
    }
}

export class HeaderActionParams extends BaseActionParams {
    selectedHeaderAction: SmartTableDetailActionModel;

    getAction() {
        return this.selectedHeaderAction;
    }

}

export class ActionValidationParams extends BaseActionParams {
    rowSelections: Array<any>;
    actionModel: BaseActionModel;
}

export class ExternalActionValidationParams {
     actionId:string;
     isValid:boolean;
}


import { SmartTableDetailActionModel } from './smart-table-detail-action.model';

export class BaseActionModel {
    private actions:Array<SmartTableDetailActionModel>;
    private isActionValidForRequired:boolean = true;
    private isActionValidForAllRequired:boolean = true;

    public get $label():string {
        return this.label;
    }

    public get $isActionValidForRequired():boolean {
        return this.isActionValidForRequired;
    }

    public set $isActionValidForRequired(value:boolean) {
        this.isActionValidForRequired = value;
    }

    public set $label(value:string) {
        this.label = value;
    }

    private label:string;

    public get $actions():Array<SmartTableDetailActionModel> {
        return this.actions;
    }

    public set $actions(value:Array<SmartTableDetailActionModel>) {
        this.actions = value;
    }


    public get $isActionValidForAllRequired():boolean {
        return this.isActionValidForAllRequired;
    }

    public set $isActionValidForAllRequired(value:boolean) {
        this.isActionValidForAllRequired = value;
    }


}
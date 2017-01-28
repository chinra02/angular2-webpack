import { ActionsEnum } from './actions.enum';
export class SmartTableDetailActionModel {

    private id: string;
    private name: string;
    private contexts: Array<ActionsEnum>;
    private isEnabled: boolean = true;
    private confirmMessage: string;
    private confirmFunc: Function;
    private actionValidForFunc: Function;  //Ex.canSendInvoiceBackForApproval,
    private actionValidForAllFunc: Function; //Ex. canSendInvoicesBackForApproval
    private onAction: Function;

    public get $confirmFunc(): Function {
        return this.confirmFunc;
    }

    public set $confirmFunc(value: Function) {
        this.confirmFunc = value;
    }

    public get $actionValidForFunc(): Function {
        return this.actionValidForFunc;
    }

    public set $actionValidForFunc(value: Function) {
        this.actionValidForFunc = value;
    }

    public get $actionValidForAllFunc(): Function {
        return this.actionValidForAllFunc;
    }

    public set $actionValidForAllFunc(value: Function) {
        this.actionValidForAllFunc = value;
    }


    public get $confirmMessage(): string {
        return this.confirmMessage;
    }

    public set $confirmMessage(value: string) {
        this.confirmMessage = value;
    }

    public get $id(): string {
        return this.id;
    }

    public set $id(value: string) {
        this.id = value;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    public get $contexts(): Array<ActionsEnum> {
        return this.contexts;
    }

    public set $contexts(value: Array<ActionsEnum>) {
        this.contexts = value;
    }


    public get $isEnabled(): boolean {
        return this.isEnabled;
    }

    public set $isEnabled(value: boolean) {
        this.isEnabled = value;
    }


    public get $onAction(): Function {
        return this.onAction;
    }

    public set $onAction(value: Function) {
        this.onAction = value;
    }



}
import { SmartTableActionService } from '../services/smart-table-actions.service';
import { SmartTableComponent } from './../components/smartTable/smart-table.component';
import {
    ActionValidationParams,
    BaseActionParams,
    BulkActionParams,
    HeaderActionParams,
    RowActionParams
} from './../model/actions/smart-table-action-params.model';
import {
    BulkActionModel,
    HeaderActionModel,
    RowActionModel,
    SmartTableActionModel
} from './../model/actions/smart-table-action.model';
import { SmartTableDetailActionModel } from './../model/actions/smart-table-detail-action.model';
import { LocalStorageService } from './../services/local-storage.service';
import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';

@Component({
    selector: 'smart-table-test',
    template: `

    <smart-table-component
        [columnJson]="columnJson"
        [storageKey]="storageKey"
        (onRowClickEvent)="onRowClick($event)"
        (onPreviousRowEvent)="onPreviousRow($event)"
        (onNextRowEvent)="onNextRow($event)"
        [(data)]="data"
        [(actionModel)]="actionModel">
</smart-table-component>


    `,
    providers: [SmartTableActionService, LocalStorageService]


})
export class SmartTableTest extends SmartTableComponent implements OnInit {

    constructor(injector: Injector,actionService:SmartTableActionService,  localStorageService:LocalStorageService ) {
        super(injector, actionService,localStorageService);

    }

    ngOnInit() {
        this.handleActions();

    }

    onRowClick(event) {
        this.onRowClickEvent.emit(event);
    }


    handleActions() {

        this.actionModel = new SmartTableActionModel();

        let headerActionModel: HeaderActionModel = new HeaderActionModel();
        let smartTableDetailActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        smartTableDetailActionModel.$id = 'export';
        smartTableDetailActionModel.$name = 'Export All';
        let deleteClaimActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        deleteClaimActionModel.$id = 'deleteClaim';
        deleteClaimActionModel.$name = 'Delete Claim';
        deleteClaimActionModel.$actionValidForFunc = this.actionValidFor;
        headerActionModel.$actions = [smartTableDetailActionModel, deleteClaimActionModel];
        headerActionModel.$label = 'New Claims';
        headerActionModel.$isActionValidForRequired = false;
        this.actionModel.$headerActionModel = headerActionModel;


        let bulkActionModel: BulkActionModel = new BulkActionModel();
        let smartTablePaperClaimDetailActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        smartTablePaperClaimDetailActionModel.$id = 'edit_paper_claim';
        smartTablePaperClaimDetailActionModel.$name = 'Edit Paper Claim';
        smartTablePaperClaimDetailActionModel.$actionValidForFunc = this.actionValidFor;
        bulkActionModel.$actions = [smartTablePaperClaimDetailActionModel, smartTableDetailActionModel];
        bulkActionModel.$label = 'Claim';
        bulkActionModel.$isActionValidForRequired = false;
        this.actionModel.$bulkActionModel = bulkActionModel;

        let rowActionModel: RowActionModel = new RowActionModel();
        rowActionModel.$actions = [smartTablePaperClaimDetailActionModel, smartTableDetailActionModel];
        rowActionModel.$isActionValidForRequired = true;
        this.actionModel.$rowActionModel = rowActionModel;

        this.actionService.onActionConfirmationMessage().subscribe((params: BaseActionParams) => {
            params.message = "Hello Modal!!";
            this.actionService.getActionConfirmationMessageRespSource().next(params);
        });

        this.actionService.onHeaderActionPerform().subscribe((action: HeaderActionParams) => {

        });

        this.actionService.onBulkActionPerform().subscribe((action: BulkActionParams) => {

        });

        this.actionService.onRowActionPerform().subscribe((rowActionParam: RowActionParams) => {

        });

        this.actionService.onActionValidFor().subscribe((actionValidationParams: ActionValidationParams) => {

            this.validateForActions(actionValidationParams);
            this.actionService.getActionValidForRespSource().next(actionValidationParams);
        });

        this.actionService.onActionValidForAll().subscribe((actionValidationParams: ActionValidationParams) => {

            this.validateForAllActions(actionValidationParams);
            this.actionService.getActionValidForAllRespSource().next(actionValidationParams);
        });
    }

    private validateForActions(actionValidationParams: ActionValidationParams): void {
        let actions: Array<any> = actionValidationParams.actionModel.$actions;
        let rowSelections: Array<any> = actionValidationParams.rowSelections;
        actions.forEach(action => {
            if (action.$actionValidForFunc != null && action.$actionValidForFunc != undefined)
                action.$isEnabled = action.$actionValidForFunc.call(this, rowSelections);

        })
    }

    private validateForAllActions(actionValidationParams: ActionValidationParams): void {
        let actions: Array<any> = actionValidationParams.actionModel.$actions;
        let rowSelections: Array<any> = actionValidationParams.rowSelections;
        actions.forEach(action => {
            if (action.$actionValidForAllFunc != null && action.$actionValidForAllFunc != undefined)
                action.$isEnabled = action.$actionValidForAllFunc.call(this, rowSelections);

        })
    }

    private actionValidFor(): boolean {
        return false;
    }


    private onPreviousRow(event) {
        console.log(event);
    }

    private onNextRow(event) {
        console.log(event);
    }

}
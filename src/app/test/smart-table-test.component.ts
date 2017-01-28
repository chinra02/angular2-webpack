import { Ng2RadioGroupComponent } from './../components/ng2radiogroup/ng2radiogroup.component';
import { Ng2Select } from '../components/ng2select/ng2-select.component';
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
import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'smart-table-test',
    templateUrl: './smart-table-test.component.html',
    providers: [SmartTableActionService, LocalStorageService]


})
export class SmartTableTest extends SmartTableComponent implements OnInit {
    @ViewChild('pendListFilter', Ng2Select) ng2Select: Ng2Select;
    @ViewChild('smarTableRadio', Ng2RadioGroupComponent) ng2RadioGroup: Ng2RadioGroupComponent;
    pendListFilterMessage = { id: -1, name: '---All LIST---' };
    allListFilterdData: Array<any>;


    public genders = [
        { value: 'F', display: 'Female' },
        { value: 'M', display: 'Male' }
    ];


    constructor(injector: Injector, changeDetectRef: ChangeDetectorRef, actionService: SmartTableActionService, localStorageService: LocalStorageService) {
        super(injector, changeDetectRef, actionService, localStorageService);

    }


    ngOnInit() {

        this.ng2Select.selectedOption = this.pendListFilterMessage.id;
        this.ng2RadioGroup.selectedRadioButton = 'M';
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

    setTableData(data) {
        this.allListFilterdData = data;
    }


    onRadioButtonSelected(event) {
        console.log(event);
    }

    onRowClick(event) {
        this.onRowClickEvent.emit(event);
    }



    private onPreviousRow(event) {
        console.log(event);
    }

    private onNextRow(event) {
        console.log(event);
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

}
import { Row } from './../smartTable/ng2-smart-table/lib/data-set/row';
import { ActionValidationParams } from './../../model/actions/smart-table-action-params.model';
import { RowActionModel } from './../../model/actions/smart-table-action.model';
import { SmartTableActionService } from './../../services/smart-table-actions.service';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'row-action-component',
    template: `
        <ng2-dropdown-comp label="Actions" [displayLength]="false" (selected)="onRowAction($event)" class="row-action"
            optionsDisplayProperty="name" [isSmartSelectorEnabled]="false" [data]="rowActionModel | objectFilter: 'actions'" >
     </ng2-dropdown-comp>
    `,
    styleUrls: ['./row-action-dropdown.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,


})
export class RowActionComponent implements OnInit {

    @Input() displayLength: boolean = true;
    @Input() rowActionModel: RowActionModel;
    @Input() optionsDisplayProperty: string = 'label';
    @Input() isSmartSelectorEnabled: boolean = true;
    @Input() row:Row;

    @Output() public selected: EventEmitter<any> = new EventEmitter<any>();

    @Input() rowSelections: Array<any> = new Array<any>();

    constructor(private actionService: SmartTableActionService, private changeDetectRef: ChangeDetectorRef) {
    }

    onRowAction(event) {
        this.selected.emit(event);
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows: Array<any>) => {
            this.rowSelections = rows;
        });
        this.invokeActionValidFor();
    }

    private invokeActionValidFor() {
        if (this.rowActionModel.$isActionValidForRequired) {
            let actionValidationParams: ActionValidationParams = new ActionValidationParams();
            actionValidationParams.rowSelections = [this.row];
            actionValidationParams.actionModel = this.rowActionModel;
            this.actionService.getActionValidForSource().next(actionValidationParams);

            this.actionService.onActionValidForResponse().subscribe((resp: ActionValidationParams) => {
                this.rowActionModel.$actions = resp.actionModel.$actions;
                this.changeDetectRef.markForCheck();
            });
        }


    }
}
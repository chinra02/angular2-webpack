import { SmartTableDetailActionModel } from './../../model/actions/smart-table-detail-action.model';
import { ActionValidationParams, ExternalActionValidationParams } from './../../model/actions/smart-table-action-params.model';
import { HeaderActionModel } from './../../model/actions/smart-table-action.model';
import { SmartTableActionService } from './../../services/smart-table-actions.service';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

@Component({
    selector: 'header-action-component',
    template: `
        <ng2-dropdown-comp *ngIf="headerActionModel!=null && headerActionModel!=undefined" 
                           [label]="headerActionModel.label" [displayLength]="false" (selected)="onHeaderAction($event)"
                           optionsDisplayProperty="name" [isSmartSelectorEnabled]="false"
                           [data]="headerActionModel | objectFilter: 'actions'">
        </ng2-dropdown-comp>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderActionComponent implements OnInit {
    @Input() displayLength: boolean = true;
    @Input() headerActionModel: HeaderActionModel;
    @Input() optionsDisplayProperty: string = 'label';
    @Input() isSmartSelectorEnabled: boolean = true;

    @Output() public selected: EventEmitter<any> = new EventEmitter<any>();

    @Input() rowSelections: Array<any> = new Array<any>();

    constructor(private actionService: SmartTableActionService, private changeDetectRef: ChangeDetectorRef) {
    }

    onHeaderAction(event) {
        this.selected.emit(event);
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows: Array<any>) => {
            this.rowSelections = rows;
            if (this.headerActionModel.$isActionValidForAllRequired) {
                let actionValidationParams: ActionValidationParams = new ActionValidationParams();
                actionValidationParams.rowSelections = this.rowSelections;
                actionValidationParams.actionModel = this.headerActionModel;
                this.actionService.getActionValidForAllSource().next(actionValidationParams);
            }

        });

        this.actionService.onActionValidForAllResponse().subscribe((resp: ActionValidationParams) => {
            if (resp.actionModel instanceof HeaderActionModel) {
                this.headerActionModel.$actions = resp.actionModel.$actions;
                this.changeDetectRef.markForCheck();
            }

        });

    }

}
import { SmartTableActionService } from '../../services/smart-table-actions.service';
import { ActionValidationParams } from './../../model/actions/smart-table-action-params.model';
import { BulkActionModel } from './../../model/actions/smart-table-action.model';
import { ObjectUtils } from './../../utils/object-utils';
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

    selector: 'ui-bulk-action-component',
    templateUrl: './bulk-action-dropdown.component.html',
    styleUrls: ['./bulk-action-dropdown.css'],
    changeDetection: ChangeDetectionStrategy.OnPush


})
export class UiBulkActionComponent implements OnInit {
    @Input() label = 'Bulk Actions';
    @Input() bulkActionModel: BulkActionModel;
    @Input() context: any;
    @Input() menuId: string;
    @Input() rowSelections: Array<any> = new Array<any>();
    @Input() toolTip: string;
    @Input() optionsDisplayProperty: string = 'label';

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    displayValue: any;

    constructor(private actionService: SmartTableActionService, private changeDetectRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows: Array<any>) => {
            this.rowSelections = rows;
            this.changeDetectRef.markForCheck();
            if (this.bulkActionModel.$isActionValidForAllRequired) {
                let actionValidationParams: ActionValidationParams = new ActionValidationParams();
                actionValidationParams.actionModel = this.bulkActionModel;
                actionValidationParams.rowSelections = this.rowSelections;
                this.actionService.getActionValidForAllSource().next(actionValidationParams);
            }

        });

        this.actionService.onActionValidForAllResponse().subscribe((resp: ActionValidationParams) => {
            if (resp.actionModel instanceof BulkActionModel) {
                this.bulkActionModel.$actions = resp.actionModel.$actions;
                this.changeDetectRef.markForCheck();
            }

        });
    }

    onSelect(event, selectedOption) {
        if (ObjectUtils.isNullOrUndefined(this.label)) {
            this.displayValue = selectedOption.label;
        }
        event.selectedOption = selectedOption;
        event.rowSelections = this.rowSelections;
        this.selected.emit(event);
    };


}
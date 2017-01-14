import { Row } from '../smartTable/ng2-smart-table/lib/data-set/row';
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
    OnChanges,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';

@Component({

    selector: 'ui-bulk-action-component',
    templateUrl: './bulk-action-dropdown.component.html',
    styleUrls: ['./bulk-action-dropdown.css'],
    changeDetection: ChangeDetectionStrategy.OnPush


})
export class UiBulkActionComponent implements OnInit, OnChanges {
    @Input() label = 'Bulk Actions';
    @Input() bulkActionModel:BulkActionModel;
    @Input() context:any;
    @Input() menuId:string;
    @Input() rowSelections:Array<any> = new Array<any>();
    @Input() toolTip:string;
    @Input() optionsDisplayProperty:string = 'label';

    @Output() selected:EventEmitter<any> = new EventEmitter<any>();

    displayValue:any;

    constructor(private actionService:SmartTableActionService, private changeDetectRef:ChangeDetectorRef) {
    }

    ngOnChanges(changes:{ [propertyName: string]: SimpleChange }) {
        if (ObjectUtils.isNullOrUndefined(this.rowSelections)) {
            this.rowSelections = new Array<any>();
        }
    }

    getSelectedRows(){
        return this.rowSelections.filter(row=>row.selected==true);
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows:Array<any>) => {
            if (this.rowSelections.length == 0) {
                this.rowSelections.push(rows[0]);
            }
            else {
                let matchedFound:boolean = false;
                this.rowSelections.forEach((row:Row) => {
                    if (row.id === rows[0].id) {
                        row = rows[0];
                        matchedFound = true;
                    }

                });
                if (!matchedFound)
                    this.rowSelections.push(rows[0]);

            }

            this.changeDetectRef.markForCheck();
            if (this.bulkActionModel.$isActionValidForAllRequired) {
                let actionValidationParams:ActionValidationParams = new ActionValidationParams();
                actionValidationParams.actionModel = this.bulkActionModel;
                actionValidationParams.rowSelections = this.rowSelections;
                this.actionService.getActionValidForAllSource().next(actionValidationParams);
            }

        });

        this.actionService.onActionValidForAllResponse().subscribe((resp:ActionValidationParams) => {
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
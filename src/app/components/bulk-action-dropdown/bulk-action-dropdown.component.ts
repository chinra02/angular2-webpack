import { SmartTableDetailActionModel } from './../../model/actions/smart-table-detail-action.model';
import { Row } from '../smartTable/ng2-smart-table/lib/data-set/row';
import { SmartTableActionService } from '../../services/smart-table-actions.service';
import { ActionValidationParams, ExternalActionValidationParams } from './../../model/actions/smart-table-action-params.model';
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
    @Input() bulkActionModel: BulkActionModel;
    @Input() context: any;
    @Input() menuId: string;
    @Input() rowSelections: Array<any> = new Array();
    @Input() toolTip: string;
    @Input() optionsDisplayProperty: string = 'label';

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    displayValue: any;

    constructor(private actionService: SmartTableActionService, private changeDetectRef: ChangeDetectorRef) {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (ObjectUtils.isNullOrUndefined(this.rowSelections)) {
            this.rowSelections = new Array();
        }
    }

    getSelectedRows() {
        return this.rowSelections.filter(row => row.selected == true);
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows: Array<any>) => {
            this.createOrUpdateRowSelections(rows);
            if (this.bulkActionModel.$isActionValidForAllRequired) {
                let actionValidationParams: ActionValidationParams = new ActionValidationParams();
                actionValidationParams.actionModel = this.bulkActionModel;
                actionValidationParams.rowSelections = this.rowSelections;
                this.actionService.getActionValidForAllSource().next(actionValidationParams);
            }
            this.changeDetectRef.markForCheck();
        });

        this.actionService.onActionValidForAllResponse().subscribe((resp: ActionValidationParams) => {
            if (resp.actionModel instanceof BulkActionModel) {
                this.bulkActionModel.$actions = resp.actionModel.$actions;
            }
            this.changeDetectRef.markForCheck();
        });

    }


    private createOrUpdateRowSelections(rows: Array<any>) {
        if (ObjectUtils.isEmptyArray(rows)) {
            this.rowSelections = new Array();
        }
        else {
            if (!ObjectUtils.isEmptyArray(this.rowSelections)) {
                rows.forEach(inputRow => {
                    let matchedFound: boolean = false;
                    this.rowSelections.forEach((row: any) => {
                        if (row.id === inputRow.id) {
                            row.selected = inputRow.selected;
                            matchedFound = true;
                        }

                    });
                    if (!matchedFound)
                        this.rowSelections.push(inputRow);

                });
            }
            else {
                this.rowSelections = new Array();
                rows.forEach(row => this.rowSelections.push(row));
            }
        }
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
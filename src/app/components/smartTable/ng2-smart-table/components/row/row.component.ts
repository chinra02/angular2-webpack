import { Row } from './../../lib/data-set/row';
import { RowAction } from "./../actions/row-action.component";
import browser = require("./../3rdPartyVendor.browser/components/smartTable/ng2-smart-table/components/row")
import { RowActionModel } from './../../../../../model/actions/smart-table-action.model';
import { Grid } from './../../lib/grid';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'row-component',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.css'],
    changeDetection: ChangeDetectionStrategy.Default

})
export class RowComponent {

    @Input() grid:Grid;
    @Input() rowActionModel:RowActionModel;

    @Output() rowSelectionChange:EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectedRowAction:EventEmitter<any> = new EventEmitter<any>();

    protected onRowSelection(event, row:Row) {
        row.isSelected = event.selectedValue;
        this.rowSelectionChange.emit(this.grid.getSelectedRows());
    }

    protected onRowAction(event, selectedRow) {
        event.selectedRow = selectedRow;
        this.onSelectedRowAction.emit(event);
    }

}
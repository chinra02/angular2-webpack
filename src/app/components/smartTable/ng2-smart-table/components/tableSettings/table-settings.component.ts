import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';
import { Column } from '../../lib/data-set/column';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-settings',
    moduleId: module.id,
    templateUrl: 'table-settings.html'
    
})
export class TableSettings {
    @Input() grid: Grid;
    @Input() selectedPage: any;
    @Input() selectedFilter: any;
    @Output() columnFiterChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() pageSizeChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() sliderOpen: boolean = false;

    private onColumnFilterChange(event) {
        this.columnFiterChange.emit(event);
    }

    private selectedPageSize(event, property: string) {
        this.selectedPage = event.selectedOption[property];
        this.pageSizeChange.emit(this);
    }

    private listFilters() {
        // return SmartTablePrefs.listFilters(ctrl.filterkey)
    };

}
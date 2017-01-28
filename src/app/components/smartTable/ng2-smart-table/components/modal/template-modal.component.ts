import { ObjectUtils } from './../../../../../utils/object-utils';
import { LocalSorter } from './../../lib/data-source/local/local.sorter';
import { SmartTableSearchService } from '../../../services/smart-table-search.service';
import { Column } from './../../lib/data-set/column';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'template-modal',
    templateUrl: './template-modal.component.html',
    styleUrls: ['./template-modal.component.css']

})
export class TemplateModal implements OnChanges {
    @Input() title: string = 'text';
    @Input() type: string = 'text';
    @Input() column: Column;
    @Input() currentDirection: string = 'sort-ctrls';

    @Output() onSort: EventEmitter<any> = new EventEmitter<any>();

    columnType: string;

    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (ObjectUtils.isNotNullAndUndefined(this.type)) {
            if (this.type === 'number') {
                this.columnType = 'numeric-search';
            }
            else {
                this.columnType = this.type + '-search';
            }

        }
    }

    searchParams: any;

    constructor(private searchService: SmartTableSearchService) {
    }

    onColumnSearch(searchParams) {
        this.searchService.getSearchSource().next(searchParams);
    }

    triggerCloseModal(event: any) {
        this.closeModal.emit(event);
    }

    sort(event) {
        this.onSort.emit(event);
        LocalSorter.changeSortDirection(this.currentDirection,this.column.sortDirection);
    }


}
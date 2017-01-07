import { ObjectUtils } from './../../../../../utils/object-utils';
import { SmartTableSearchService } from './../../../services/smart-table-search';
import { Column } from './../../lib/data-set/column';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'template-modal',
    templateUrl: './template-modal.component.html',
    styleUrls: ['./template-modal.component.css']

})
export class TemplateModal implements OnChanges {
    @Input() title:string = 'text';
    @Input() type:string = 'text';
    @Input() column:Column;

    columnType:string;

    @Output() closeModal:EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
        if (ObjectUtils.isNotNullAndUndefined(this.type)) {
            if(this.type === 'number'){
               this.columnType = 'numeric-search';
            }
            else{
                this.columnType = this.type + '-search';
            }
            
        }
    }

    searchParams:any;

    constructor(private searchService:SmartTableSearchService) {
    }

    onColumnSearch(searchValue) {
        let searchParams = {key: this.column.id, value: searchValue};
        this.searchService.getSearchSource().next(searchParams);
    }

    triggerCloseModal(event:any) {
        this.closeModal.emit(event);
    }
}
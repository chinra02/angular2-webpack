import { EventEmitter } from '@angular/forms/src/facade/async';
import { OnChange } from 'ng2-bootstrap/utils/decorators';
import { Column } from './../ng2-smart-table/lib/data-set/column';
import { NgFor } from '@angular/common';
import { Row } from '../ng2-smart-table/lib/data-set/row';
import { Component, Input, OnChanges, Output, SimpleChange } from '@angular/core';
@Component({
    selector: 'quick-view',
    templateUrl: './quick-view.component.html',
    styleUrls: ['./quick-view.scss']

})
export class QuickViewComponent implements OnChanges {
    @Input() row: Row;
    @Input() columns: Array<Column>;

    @Output() onPrevious: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    colSpanLength: number;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['columns']) {
            this.colSpanLength = this.columns.length + 1;
        }
    }



}
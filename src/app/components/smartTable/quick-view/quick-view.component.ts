import { QuickViewModalComponent } from './modal/quick-view-modal.component';
import { Modal } from 'ng2-modal';
import { EventEmitter } from '@angular/forms/src/facade/async';
import { OnChange } from 'ng2-bootstrap/utils/decorators';
import { Column } from './../ng2-smart-table/lib/data-set/column';
import { NgFor } from '@angular/common';
import { Row } from '../ng2-smart-table/lib/data-set/row';
import { Component, Input, OnChanges, Output, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
@Component({
    selector: 'quick-view',
    templateUrl: './quick-view.component.html',
    styleUrls: ['./quick-view.scss']

})
export class QuickViewComponent implements OnChanges {
    @ViewChild('quickViewModal', QuickViewModalComponent) quickViewModal: QuickViewModalComponent

    @Input() row: Row;
    @Input() columns: Array<Column>;
    @Input() isModalOpen: boolean = false;
    @Input() componentTemplateUrl: string;

    contextValue: Object;

    @Output() onPrevious: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalPrevious: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalNext: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    colSpanLength: number;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['columns']) {
            this.colSpanLength = this.columns.length + 1;
        }
    }

    dynamicCallback($event) {
        if (this.isModalOpen) {
            this.quickViewModal.modal.open();
        }
        console.log('Quickview template loaded !!!!');
    }

    onModalClick(event) {
        this.quickViewModal.modal.open();
    }




}
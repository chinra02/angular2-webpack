import { Modal } from 'ng2-modal';
import { Row } from './../../ng2-smart-table/lib/data-set/row';
import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
@Component({
    selector: 'quick-view-modal',
    templateUrl: './quick-view-modal.component.html'
})
export class QuickViewModalComponent {
    @ViewChild('modal', Modal) modal:Modal;
    @Input() row:Row;
    @Input() contextValue:Object;
    @Input() componentTemplateUrl:string;

    @Output() modalPrevious:EventEmitter<any> = new EventEmitter<any>();
    @Output() modalNext:EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose:EventEmitter<any> = new EventEmitter<any>();

    onModalPrevious() {
        this.modalPrevious.emit(this.row);
    }

    onModalNext() {
        this.modalNext.emit(this.row);
    }

    onModalClose(event) {
        this.modalClose.emit(event);
    }


}
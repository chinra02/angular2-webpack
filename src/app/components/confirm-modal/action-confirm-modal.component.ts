import { Modal } from 'ng2-modal';
import { ElementRef } from '@angular/core';
import { BaseActionParams } from './../../model/actions/smart-table-action-params.model';
import { SmartTableActionService } from './../../services/smart-table-actions.service';
import { Component, Input, ViewChild } from '@angular/core';
@Component({
    selector: 'confirm-modal',
    templateUrl: './action-confirm-modal.component.html',
    providers: [Modal]
})
export class ActionConfirmModalComponent {

    @Input() title: string;
    @Input() message: string;

    params: BaseActionParams;
    @ViewChild(Modal) confirm: Modal;

    constructor(private actionService: SmartTableActionService) { }

    showConfirm(param: BaseActionParams) {
        this.params = param;
        this.message = param.message;
        this.confirm.open();
    }

    hideConfirm() {
        this.confirm.close();
    }

    yes() {
        this.hideConfirm();
        this.actionService.getActionConfirmationSource().next(this.params);
    }



}
import { LocalStorageService } from '../../services/local-storage.service';
import { SmartTableActionService } from '../../services/smart-table-actions.service';
import { SmartTableServicesModule } from '../../services/smart-table-services.module';
import { SmartTableStorageActions } from './../../actions/smart-table/smart-table-storage.actions';
import { ActionConfirmModalComponent } from './../confirm-modal/action-confirm-modal.component';
import { HeaderActionComponent } from './../header-action-dropdown/header-action.component';
import { Ng2SmartTableModule } from './ng2-smart-table.module';
import { SmartTableComponent } from './smart-table.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2SmartTableModule,
        ModalModule,
        SmartTableServicesModule,

    ],
    declarations: [
        ActionConfirmModalComponent,
        HeaderActionComponent,
        SmartTableComponent
    ],
    exports: [SmartTableComponent],

})
export class SmartTableModule {

}
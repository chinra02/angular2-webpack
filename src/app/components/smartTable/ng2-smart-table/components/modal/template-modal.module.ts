import { CellModule } from './../cell/cell.module';
import { TemplateModal } from './template-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        CellModule
       
    ],
    declarations: [
        TemplateModal,
        
    ],
    exports: [
        TemplateModal
    ]
})
export class TemplateModalModule {

}
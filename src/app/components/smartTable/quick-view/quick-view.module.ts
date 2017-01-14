import { ModalModule } from 'ng2-modal';
import { DynamicComponentModule } from 'angular2-dynamic-component';
import { QuickViewModalComponent } from './modal/quick-view-modal.component';
import { QuickViewComponent } from './quick-view.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
    imports:[
        CommonModule,
        DynamicComponentModule,
        ModalModule
    
    ],
    declarations:[
        QuickViewComponent,
        QuickViewModalComponent
    ],
    exports:[
        QuickViewComponent,
        QuickViewModalComponent
    ]
})
export class QuickViewModule {

}
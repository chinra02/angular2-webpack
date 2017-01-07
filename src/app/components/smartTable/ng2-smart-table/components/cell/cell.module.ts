import { DynamicComponentModule } from 'angular2-dynamic-component';
import { Safe } from '../../../../../utils/safe.pipe';
import { CellComponent } from './cell.component';
import { CellTemplate } from './cell-template/cell-template.component';
import { TemplateModule } from './templates/template.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ng2-popover';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PopoverModule,
        TemplateModule,
        DynamicComponentModule
    ],
    declarations: [
         CellTemplate,
         CellComponent,
         Safe
       
    ],
    exports: [
        CellTemplate,
        CellComponent,
        Safe
       
      
    ]
})
export class CellModule {

}
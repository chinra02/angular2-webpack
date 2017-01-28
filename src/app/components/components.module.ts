import { SmartTableModule } from './smartTable/smart-table.module';
import { Ng2DatePickerModule } from './ng2datepicker/ng2-datepicker.module';
import { Ng2RadioGroupComponent } from './ng2radiogroup/ng2radiogroup.component';
import { Ng2Select } from './ng2select/ng2-select.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SmartTableModule,
        Ng2DatePickerModule
    ],
    declarations: [
        Ng2Select,
        Ng2RadioGroupComponent
    ],
    exports: [
        Ng2Select,
        Ng2RadioGroupComponent
    ]

})
export class ComponentsModule {

}
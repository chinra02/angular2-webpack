import { SmartTableModule } from './smartTable/smart-table.module';
import { Ng2DropDownComponent } from './ng2dropdown/ng2dropdown.component';
import { Ng2DatePickerModule } from './ng2datepicker/ng2-datepicker.module';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        SmartTableModule,
        Ng2DatePickerModule
    ]

})
export class ComponentsModule {

}

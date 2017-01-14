import { DatePickerComponent } from './ng2-datepicker.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatepickerModule} from "ng2-bootstrap/datepicker/datepicker.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DatepickerModule
    ],
    declarations: [
        DatePickerComponent
    ],
    exports: [
        DatePickerComponent
    ]
})
export class Ng2DatePickerModule {

}
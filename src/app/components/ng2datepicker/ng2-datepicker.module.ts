import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatepickerModule } from 'ng2-bootstrap';
import { DatePickerComponent } from './ng2-datepicker.component';
import { NgModule } from '@angular/core';
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
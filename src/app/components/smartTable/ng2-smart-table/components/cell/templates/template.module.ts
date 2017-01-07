import { TextViewComponent } from './text-template/text-view.component';
import { MultiJoiner } from '../../../../../../utils/multi-joiner.pipe';
import { SmartTableName } from '../../../../../../utils/smart-table-name.pipe';
import { Ng2DatePickerModule } from '../../../../../ng2datepicker/ng2-datepicker.module';
import { CommaSeparatedList } from './../../../../../../utils/comma-separated-list.pipe';
import { SearchDropdownComponent } from './../../../../../search-dropdown/search-dropdown.component';
import { DateTemplate } from './date-template/date-template.component';
import { ListTemplate } from './list-template/list-template.component';
import { MessagesTemplate } from './messages-template/messages-template.component';
import { MessagesPopOver } from './messages-template/messages-view-popover.component';
import { MoneyTemplate } from './money-template/money-template.component';
import { NameTemplate } from './name-template/name-template.component';
import { NumericTemplate } from './numeric-template/numeric-template.component';
import { RangeTemplate } from './range-template/range-template.component';
import { SearchDescriptionTemplate } from './search-description-template/search-description-template.component';
import { TextTemplate } from './text-template/text-template.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'angular2-select';
import { PopoverModule } from 'ng2-popover';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        Ng2DatePickerModule,
        PopoverModule
    ],
    declarations: [
        CommaSeparatedList,
        SearchDropdownComponent,
        DateTemplate,
        TextTemplate,
        ListTemplate,
        MultiJoiner,
        MessagesPopOver,
        MessagesTemplate,
        NameTemplate,
        SmartTableName,
        RangeTemplate,
        MoneyTemplate,
        NumericTemplate,
        SearchDescriptionTemplate,
        TextViewComponent


    ],
    exports: [
        DateTemplate,
        TextTemplate,
        SearchDropdownComponent,
        CommaSeparatedList,
        ListTemplate,
        MultiJoiner,
        MessagesPopOver,
        MessagesTemplate,
        NameTemplate,
        SmartTableName,
        RangeTemplate,
        MoneyTemplate,
        NumericTemplate,
        SearchDescriptionTemplate,
        TextViewComponent

    ],
    providers: [
        CommaSeparatedList, MultiJoiner
    ]

})
export class TemplateModule {

}
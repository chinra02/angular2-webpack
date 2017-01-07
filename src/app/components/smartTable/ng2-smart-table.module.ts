import { CollapseModule } from 'ng2-bootstrap/collapse';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { DynamicComponentModule } from 'angular2-dynamic-component';
import { CellModule } from './ng2-smart-table/components/cell/cell.module';
import { SearchDescriptionComponent } from "./ng2-smart-table/components/search-description/search-description.component";
import { FilterPipe } from '../../utils/filter.pipe';
import { UiBulkActionComponent } from '../bulk-action-dropdown/bulk-action-dropdown.component';
import { Ng2DropDownComponent } from '../ng2dropdown/ng2dropdown.component';
import { RowActionComponent } from '../row-action-dropdown/row-action-dropdown.component';
import { NG2_SMART_TABLE_DIRECTIVES } from './ng2-smart-table.directives';
import { HeaderActions } from './ng2-smart-table/components/actions/header-actions.component';
import { RowAction } from './ng2-smart-table/components/actions/row-action.component';
import { CellComponent } from './ng2-smart-table/components/cell/cell.component';
import { FilterComponent } from './ng2-smart-table/components/filter/filter.component';
import { ModalEventsDirective } from './ng2-smart-table/components/modal/modal-events.directive';
import { TemplateModalModule } from './ng2-smart-table/components/modal/template-modal.module';
import { PagerComponent } from './ng2-smart-table/components/pager/pager.component';
import { SmartSelector } from './ng2-smart-table/components/selector/selector.component';
import { TableSettings } from './ng2-smart-table/components/tableSettings/table-settings.component';
import { TitleComponent } from './ng2-smart-table/components/title/title.component';
import { Ng2SmartTableComponent } from './ng2-smart-table/ng2-smart-table.component';
import { SmartTableSearchService } from './services/smart-table-search';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-dropdown';
import { ModalModule } from 'ng2-modal';
import { PopoverModule } from 'ng2-popover';
import { TooltipModule } from 'ng2-tooltip';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalModule,
    TooltipModule,
    DropdownModule,
    CellModule,
    TemplateModalModule,
    PopoverModule,
    DynamicComponentModule,
    CollapseModule

  ],
  declarations: [
    Ng2DropDownComponent,
    UiBulkActionComponent,
    FilterComponent,
    PagerComponent,
    TitleComponent,
    SmartSelector,
    TableSettings,
    HeaderActions,
    RowAction,
    ModalEventsDirective,
    SearchDescriptionComponent,
    QuickViewComponent,
    ...NG2_SMART_TABLE_DIRECTIVES
  ],
  entryComponents: [Ng2SmartTableComponent, RowActionComponent],
  exports: [
    Ng2DropDownComponent,
    UiBulkActionComponent,
    FilterPipe,
    ModalEventsDirective,
    SearchDescriptionComponent,
    QuickViewComponent,
    ...NG2_SMART_TABLE_DIRECTIVES
  ],
  providers: [Window, SmartTableSearchService]
})
export class Ng2SmartTableModule {
}
import { AutoSize } from '../../utils/auto-size.directive';
import { FilterPipe } from '../../utils/filter.pipe';
import { SmartTableName } from '../../utils/smart-table-name.pipe';
import { CurrencyFormatPipe } from './../../utils/currency-format.pipe';
import { CurrencyFormatterDirective } from './../../utils/currency-formatter.directive';
import { ObjectFilter } from './../../utils/object-filter.pipe';
import { Safe } from './../../utils/safe.pipe';
import { RowActionComponent } from './../row-action-dropdown/row-action-dropdown.component';
import { HeaderActions } from './ng2-smart-table/components/actions/header-actions.component';
import { RowAction } from './ng2-smart-table/components/actions/row-action.component';
import { RowComponent } from './ng2-smart-table/components/row/row.component';
import { Ng2SmartTableComponent } from './ng2-smart-table/ng2-smart-table.component';


export const NG2_SMART_TABLE_DIRECTIVES = [Ng2SmartTableComponent, HeaderActions, RowAction,  ObjectFilter,
    CurrencyFormatPipe, CurrencyFormatterDirective,FilterPipe, AutoSize, RowActionComponent, RowComponent];
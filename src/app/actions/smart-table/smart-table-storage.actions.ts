import { IComponentState } from './../../store/index';
import { NgRedux } from 'ng2-redux';
import { ISmartTableRowSelectionData, ISmartTablePagerFilterData, ISmartTableColumnSelectionData, ISmartTableSortFilterData } from './../../store/smart-table/smart-table.reducers';
import { Constants } from './../../utils/constants';
import { LocalStorageService } from '../../services/local-storage.service';
import { SmartTableSelectionData } from './../../model/actions/smart-table-rows-selections.model';
import { Injectable } from '@angular/core';


@Injectable()
export class SmartTableStorageActions {

    constructor(private ngRedux: NgRedux<IComponentState>) { }


    onPaginate(pager: ISmartTablePagerFilterData): void {
        this.ngRedux.dispatch({
            type: Constants.ON_PAGINATED,
            payload: pager
        });

    }

    onRowSelectionChange(rows: ISmartTableRowSelectionData): void {
        this.ngRedux.dispatch({
            type: Constants.ON_ROW_SELECTION_CHANGE,
            payload: rows
        });

    }

    onColumnSelectionChange(columns: ISmartTableColumnSelectionData): void {
        this.ngRedux.dispatch({
            type: Constants.ON_COLUMN_SELECTION_CHANGE,
            payload: columns
        });
    }

    onColumnSort(sorts: ISmartTableSortFilterData): void {
        this.ngRedux.dispatch({
            type: Constants.ON_COLUMN_SORT,
            payload: sorts
        });
    }


    onColumnSearch(searchParams: Object): void {
        this.ngRedux.dispatch({
            type: Constants.ON_COLUMN_SEARCH,
            payload: searchParams
        });
    }

}
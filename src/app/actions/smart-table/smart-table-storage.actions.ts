import { Constants } from './../../utils/constants';
import { LocalStorageService } from '../../services/local-storage.service';
import { SmartTableSelectionData } from './../../model/actions/smart-table-rows-selections.model';
import { Injectable } from '@angular/core';


@Injectable()
export class SmartTableStorageActions {

    constructor(private localStorage: LocalStorageService) { }


    onPaginate(pager: Object): void {
        this.localStorage.$dispatch.emit({
            type: Constants.ON_PAGINATED,
            payload: pager
        });

    }

    onRowSelectionChange(rows: Array<SmartTableSelectionData>): void {
        this.localStorage.$dispatch.emit({
            type: Constants.ON_ROW_SELECTION_CHANGE,
            payload: rows
        });
        
    }

    onColumnSelectionChange(columns: Array<SmartTableSelectionData>): void {
        this.localStorage.$dispatch.emit({
            type: Constants.ON_COLUMN_SELECTION_CHANGE,
            payload: columns
        });
    }

    onColumnSort(sorts: Array<any>): void {
        this.localStorage.$dispatch.emit({
            type: Constants.ON_COLUMN_SORT,
            payload: sorts
        });
    }


    onColumnSearch(searchParams: Object): void {
        this.localStorage.$dispatch.emit({
            type: Constants.ON_COLUMN_SEARCH,
            payload: searchParams
        });
    }

}
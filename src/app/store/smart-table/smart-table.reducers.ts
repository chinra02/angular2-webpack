import { SmartTableSelectionData } from './../../model/actions/smart-table-rows-selections.model';
import { ObjectUtils } from './../../utils/object-utils';
import { Constants } from './../../utils/constants';

//PagerFilter
export interface ISmartTablePagerFilterData {
    tableName: string,
    pager: {
        page: number,
        perPage: number
    }

}
export const INITIAL_PAGER_STATE:Array<ISmartTablePagerFilterData> = [{
    tableName: 'INITIAL',
    pager: {
        page: 1,
        perPage: 50
    }
}];

//SortFilter

export interface ISmartTableSortFilterData {
    tableName: string,
    sorts: [{
        field: string,
        direction: string,
        compare: any
    }]
}

export const INITIAL_SORT_STATE:Array<ISmartTableSortFilterData> = [{
    tableName: 'INITIAL',
    sorts: [{
        field: 'temp',
        direction: 'asc',
        compare: null
    }]

}];

export interface ISmartTableRowSelectionData {
    tableName: string,
    rows: Array<SmartTableSelectionData>
}

export const INITIAL_ROW_SELECTION_STATE:Array<ISmartTableRowSelectionData> = [{
    tableName: 'INITIAL',
    rows: new Array<SmartTableSelectionData>()

}];

export interface ISmartTableColumnSelectionData {
    tableName: string,
    columns: Array<SmartTableSelectionData>
}

export const INITIAL_COLUMN_SELECTION_STATE:Array<ISmartTableColumnSelectionData> = [{
    tableName: 'INITIAL',
    columns: new Array<SmartTableSelectionData>()

}];


//Sort rootReducer

export function smartTableSortReducer(state:Array<ISmartTableSortFilterData> = INITIAL_SORT_STATE, action:any) {
    switch (action.type) {
        case Constants.ON_COLUMN_SORT:
            let matchedItem:ISmartTableSortFilterData = ObjectUtils.contains(state, action.payload, 'tableName');
            if (matchedItem) {
                ObjectUtils.crudRightToLeft(matchedItem.sorts, action.payload.sorts);
            }
            else {
                state.push(action.payload);
            }
            return state;
        default:
            return state;
    }
}


//Pager reducer
export function smartTablePagerReducer(state:Array<ISmartTablePagerFilterData> = INITIAL_PAGER_STATE, action:any) {
    switch (action.type) {
        case Constants.ON_PAGINATED:
            let matchedItem:ISmartTablePagerFilterData = ObjectUtils.contains(state, action.payload, 'tableName');
            if (matchedItem) {
                Object.assign(matchedItem.pager, action.payload.pager);
            }
            else {
                state.push(action.payload);
            }
            return state;
        default:
            return state;
    }
}


//Row selection Reducer
export function smartTableRowSelectionReducer(state:Array<ISmartTableRowSelectionData> = INITIAL_ROW_SELECTION_STATE, action:any) {
    switch (action.type) {
        case Constants.ON_ROW_SELECTION_CHANGE:
        {
            let matchedItem:ISmartTableRowSelectionData = ObjectUtils.contains(state, action.payload, 'tableName');
            if (matchedItem) {
                ObjectUtils.crudRightToLeft(matchedItem.rows, action.payload.rows);
            }
            else {
                state.push(action.payload);
            }
            return state;
        }
        default:
            return state;

    }

}

//Column selection Reducer
export function smartTableColumnSelectionReducer(state:Array<ISmartTableColumnSelectionData> = INITIAL_COLUMN_SELECTION_STATE, action:any) {
    switch (action.type) {
        case Constants.ON_COLUMN_SELECTION_CHANGE:
        {
            let matchedItem:ISmartTableColumnSelectionData = ObjectUtils.contains(state, action.payload, 'tableName');
            if (matchedItem) {
                ObjectUtils.crudRightToLeft(matchedItem.columns, action.payload.columns);
            }
            else {
                state.push(action.payload);
            }
            return state;
        }
        default:
            return state;

    }

}



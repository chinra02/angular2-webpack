import { SmartTableSelectionData } from './../model/actions/smart-table-rows-selections.model';
const persistState = require('redux-localstorage');
import {
    INITIAL_PAGER_STATE,
    INITIAL_SORT_STATE,
    INITIAL_ROW_SELECTION_STATE,
    INITIAL_COLUMN_SELECTION_STATE,
    ISmartTablePagerFilterData,
    ISmartTableSortFilterData,
    ISmartTableRowSelectionData,
    smartTableColumnSelectionReducer,
    ISmartTableColumnSelectionData,
    smartTablePagerReducer,
    smartTableRowSelectionReducer,
    smartTableSortReducer,
} from './smart-table/smart-table.reducers';
import { combineReducers } from 'redux';



export interface ISmartTableState {
  smartTablePager: Array<ISmartTablePagerFilterData>;
  smartTableSort: Array<ISmartTableSortFilterData>;
  smartTableRowSelection: Array<ISmartTableRowSelectionData>;
  smartTableColumnSelection: Array<ISmartTableColumnSelectionData>;

};

export const INITIAL_SMART_TABLE_STATE: ISmartTableState = {
  smartTablePager: INITIAL_PAGER_STATE,
  smartTableSort: INITIAL_SORT_STATE,
  smartTableRowSelection: INITIAL_ROW_SELECTION_STATE,
  smartTableColumnSelection: INITIAL_COLUMN_SELECTION_STATE
};

export const smartTableReducer:any = combineReducers({
  smartTableRowSelection: smartTableRowSelectionReducer,
  smartTableColumnSelection: smartTableColumnSelectionReducer,
  smartTablePager: smartTablePagerReducer,
  smartTableSort: smartTableSortReducer,

});

export interface IComponentState {
  smartTable: ISmartTableState
};

export const INITIAL_COMPONENT_STATE: IComponentState = {
  smartTable: INITIAL_SMART_TABLE_STATE
};

export const COMPONENTS_REDUCERS:any = combineReducers({
  smartTable: smartTableReducer
});

export const enhancers = [
  persistState('smartTable', { key: 'smartTable' })
];










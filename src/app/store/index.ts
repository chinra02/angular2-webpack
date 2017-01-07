import { SmartTableSelectionData } from './../model/actions/smart-table-rows-selections.model';
import {
    INITIAL_PAGER_STATE,
    INITIAL_SORT_STATE,
    ISmartTablePagerFilterData,
    ISmartTableSortFilterData,
    smartTableColumnSelectionReducer,
    smartTablePagerReducer,
    smartTableRowSelectionReducer,
    smartTableSortReducer
} from './smart-table/smart-table.reducers';
import { combineReducers } from 'redux';



export interface ISmartTableState {
  smartTablePager: ISmartTablePagerFilterData;
  smartTableSort: ISmartTableSortFilterData;
  smartTableRowSelection: Array<SmartTableSelectionData>;
  smartTableColumnSelection: Array<SmartTableSelectionData>;

};

export const INITIAL_SMART_TABLE_STATE: ISmartTableState = {
  smartTablePager: INITIAL_PAGER_STATE,
  smartTableSort: INITIAL_SORT_STATE,
  smartTableRowSelection: Array<SmartTableSelectionData>(),
  smartTableColumnSelection: Array<SmartTableSelectionData>(),
};

export const smartTableReducer = combineReducers({
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

export const componentsReducer = combineReducers({
  smartTable: smartTableReducer
});

export const COMPONENTS_REDUCERS = componentsReducer;









import { Constants } from './../../utils/constants';

//PagerFilter
export interface ISmartTablePagerFilterData {
  pager: {
    page: number,
    perPage: number
  }

}
export const INITIAL_PAGER_STATE: ISmartTablePagerFilterData = {
  pager: {
    page: 1,
    perPage: 50
  }
};

//SortFilter

export interface ISmartTableSortFilterData {
 
}

export const INITIAL_SORT_STATE: ISmartTableSortFilterData = [{
  field: 'temp',
  direction: 'asc',
  compare: null
}
];


//Sort rootReducer

export function smartTableSortReducer(state: Object = INITIAL_SORT_STATE, action: any) {
  switch (action.type) {
    case Constants.ON_COLUMN_SORT:
      return Object.assign([], state, action.payload);
    default:
      return state;
  }
}


//Pager reducer
export function smartTablePagerReducer(state: Object = INITIAL_PAGER_STATE, action: any) {
  switch (action.type) {
    case Constants.ON_PAGINATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}


//Row selection Reducer
export function smartTableRowSelectionReducer(state: Object = [], action: any) {
  switch (action.type) {
    case Constants.ON_ROW_SELECTION_CHANGE: {
      return Object.assign([], state, action.payload);
    }
    default:
      return state;

  }

}

//Column selection Reducer
export function smartTableColumnSelectionReducer(state: any = [], action: any) {
  switch (action.type) {
    case Constants.ON_COLUMN_SELECTION_CHANGE: {
      return Object.assign([], state, action.payload);
    }
    default:
      return state;

  }

}


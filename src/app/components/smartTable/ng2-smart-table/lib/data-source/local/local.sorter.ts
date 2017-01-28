export class LocalSorter {

  protected static COMPARE = (direction: any, a: any, b: any) => {
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return direction;
    }
    return 0;
  };

  static sort(data: Array<any>, field: string, direction: string, customCompare?: Function): Array<any> {

    let dir: number = (direction === 'asc' || direction === 'st-multi-sort-ascent') ? 1 : -1;
    let compare: Function = customCompare ? customCompare : this.COMPARE;

    return data.sort((a, b) => {
      return compare.call(null, dir, a[field], b[field]);
    });
  }

  static getShortSortDirection(sortDirection: string) {
    return sortDirection === 'st-multi-sort-ascent' ? 'asc' : 'dsc';
  }

  static getLongSortDirection(sortDirection: string) {
    return sortDirection === 'asc' ? 'st-multi-sort-ascent' : 'st-multi-sort-descent';
  }

  static changeSortDirection(inSortDirection:string, columnSortDirection: string): string {
    let returnSortDirection: string;
    if (inSortDirection) {
      returnSortDirection = inSortDirection === 'st-multi-sort-ascent' ? 'st-multi-sort-descent' : 'st-multi-sort-ascent';
    } else {
      returnSortDirection = columnSortDirection;
    }
    return returnSortDirection;
  }

}

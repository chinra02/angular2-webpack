import { Column } from './data-set/column';
import { DataSet } from './data-set/data-set';
import { Row } from './data-set/row';
import { DataSource } from './data-source/data-source';
import { Deferred } from './helpers';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
var _ = require('underscore');
export class Grid {

  createFormShown: boolean = false;

  protected source: DataSource;
  protected settings: any;
  protected dataSet: DataSet;

  protected onSelectRowSource = new Subject<any>();

  constructor(source: DataSource, settings: any) {
    this.setSettings(settings);
    this.setSource(source);
  }

  showActionColumn(): boolean {
    return this.getSetting('actions.add') || this.getSetting('actions.edit') || this.getSetting('actions.delete');
  }

  getNewRow(): Row {
    return this.dataSet.newRow;
  }



  setSettings(settings: Object): void {
    this.settings = settings;
    this.dataSet = new DataSet([], this.getSetting('columns'));

  }

  updateSettings(settings: Object): void {
    this.settings = settings;
    this.dataSet.createColumns(settings);

  }

  getDataSet(): DataSet {
    return this.dataSet;
  }

  getDataSource(): DataSource {
    return this.source;
  }


  setSource(source: DataSource): void {
    this.source = this.prepareSource(source);
    this.source.onChanged().subscribe((changes) => this.processDataChange(changes));
    this.source.onUpdated().subscribe((data) => {
      let changedRow = this.dataSet.findRowByData(data);
      changedRow.setData(data);
    });
  }

  getSetting(name: string, defaultValue?: any): any {
    let keys = name.split('.');
    let level = this.settings;
    keys.forEach((k) => {
      if (level && typeof level[k] !== 'undefined') {
        level = level[k];
      }
    });

    return typeof level === 'undefined' ? defaultValue : level;
  }

  getColumns(): Array<Column> {
    let columns = _.filter(this.dataSet.getColumns(), function (column) {
      return (column.isVisible == null || column.isVisible == undefined || column.isVisible === true);
    });
    return columns;
  }

  getAllColumns(): Array<Column> {
    let columns = _.filter(this.dataSet.getColumns(), function (column) {
      return (column.title != null && column.title != undefined);
    });
    return columns;
  }

  getRows(): Array<Row> {
    return this.dataSet.getRows();
  }

  getSelectedRows(): Array<Row> {
    return this.dataSet.getSelectedRows();
  }

  selectRow(row: Row): void {
    this.dataSet.selectRow(row);
  }

  onSelectRow(): Observable<any> {
    return this.onSelectRowSource.asObservable();
  }

  create(row: Row, confirmEmitter: EventEmitter<any>): void {

    let deferred = new Deferred();
    deferred.promise.then((newData) => {
      newData = newData ? newData : row.getNewData();
      this.source.prepend(newData).then(() => {
        this.createFormShown = false;
        this.dataSet.createNewRow();
      })
    }).catch((err) => {
      // doing nothing
    });

    if (this.getSetting('add.confirmCreate')) {
      confirmEmitter.emit({
        newData: row.getNewData(),
        source: this.source,
        confirm: deferred
      });
    } else {
      deferred.resolve();
    }
  }

  protected processDataChange(changes: any): void {
    if (this.shouldProcessChange(changes)) {
      this.dataSet.setData(changes['elements']);
      // Commenting this out to remove default first row selection
      /* let row = this.determineRowToSelect(changes);
       if (row) {
         this.onSelectRowSource.next(row);
       }  */
    }
  }

  protected shouldProcessChange(changes: any): boolean {
    if (['filter', 'sort', 'page', 'paging', 'remove', 'refresh', 'load'].indexOf(changes['action']) !== -1) {
      return true;
    } else if (['prepend', 'append'].indexOf(changes['action']) !== -1 && !this.getSetting('pager.display')) {
      return true;
    }

    return false;
  }

  // TODO: move to selectable? Separate directive
  protected determineRowToSelect(changes: any): Row {

    if (['load', 'page', 'filter', 'sort', 'refresh'].indexOf(changes['action']) !== -1) {
      return this.dataSet.select();
    }

    if (changes['action'] === 'add') {
      return this.dataSet.selectFirstRow();
    }
    if (changes['action'] === 'update') {
      return this.dataSet.selectFirstRow();
    }
    return null;
  }

  protected prepareSource(source: any): DataSource {
    let initialSource = this.getInitialSort();
    if (initialSource && initialSource['field'] && initialSource['direction']) {
      source.setSort([initialSource], false);
    }
    if (this.getSetting('pager.display') === true) {
      source.setPaging(1, this.getSetting('pager.perPage'), false);
    }

    source.refresh();
    return source;
  }

  protected getInitialSort() {
    let sortConf = {};
    this.getColumns().forEach((column: Column) => {
      if (column.isSortable && column.defaultSortDirection) {
        sortConf['field'] = column.id;
        sortConf['direction'] = column.defaultSortDirection;
        sortConf['compare'] = column.getCompareFunction();
      }
    });
    return sortConf;
  }

  getPreviousRow(currentRow: Row): Row {
    let currentRowIndex = this.getRowIndex(currentRow);
    let previousRowIndex: number = currentRowIndex - 1;
    let previousRow: Row;
    if (previousRowIndex > -1) {
      previousRow = this.getRows()[previousRowIndex];

    }
    return previousRow;
  }

  getRowIndex(row: Row): number {
    let rowIndex = -1;
    this.getRows().forEach((innerRow: Row, index: number, rows: Array<Row>) => {
      if (innerRow.id === row.id) {
        rowIndex = index;
        return true;
      }
    });

    return rowIndex;
  }

  getNextRow(currentRow: Row): Row {
    let rows: Array<Row> = this.getRows();
    let nextRow: Row;
    let currentRowIndex = this.getRowIndex(currentRow);
    let nextRowIndex: number = currentRowIndex + 1;
    if (nextRowIndex < rows.length - 1) {
      nextRow = rows[nextRowIndex];

    }
    return nextRow;
  }


}

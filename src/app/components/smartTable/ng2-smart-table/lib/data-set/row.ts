import { Cell } from './cell';
import { Column } from './column';
import { DataSet } from './data-set';

let _ = require('underscore');

export class Row {

    isSelected: boolean = false;
    isQuickViewOpen: boolean = false;
    protected cells: Array<Cell> = new Array<Cell>();

    constructor(public id: string, protected data: any, protected dataSet: DataSet, selected: boolean) {
        this.isSelected = selected;
        this.createCells();
    }

    protected createCells(): void {
        this.dataSet.getColumns().forEach((column: Column) => {
            let cell = this.createCell(column);
            this.cells.push(cell);
        });
    }

    protected createCell(column: Column): Cell {
        let value = '';
        let tempValue = '';
        if (column.id.indexOf('.') > -1) {
            let tempValue = this.data;
            let columnProps: Array<string> = column.id.split('.');
            columnProps.forEach((prop: string) => {
                tempValue = tempValue[prop];
            });
            value = tempValue;

        }
        else if (typeof this.data[column.id] !== 'undefined') {
            value = this.data[column.id];
        }

        if (_.isArray(value)) {
            return new Cell(value, this, column, this.dataSet, true);
        } else {
            return new Cell(value, this, column, this.dataSet, false);
        }

    }

    setSelected(selected: boolean): void {
        this.isSelected = selected;
    }

    getCell(column: Column): Cell {
        return this.cells.find(el => el.getColumn() === column);
    }

    getCells() {
        return this.cells;
    }

    getData(): any {
        return this.data;
    }

    getNewData(): any {
        let values = {};
        this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
        return Object.assign(this.data, values);
    }

    setData(data: any): any {
        this.data = data;
        this.createCells();
    }
}

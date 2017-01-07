import { SmartTableSelectionData } from './../../../../../model/actions/smart-table-rows-selections.model';
import { Column } from './column';
import { Row } from './row';

export class DataSet {

    public newRow: Row;

    protected data: Array<any> = new Array();
    private columns: Array<Column> = new Array();
    protected rows: Array<Row> = new Array();
    protected selectedRows: Array<any>;
    protected selectedColumns: Array<any>;
    protected selectedRow: Row;

    constructor(data: Array<any> = new Array(), protected columnSettings: Object) {

        this.createColumns(columnSettings);
        this.setData(data);

        this.createNewRow();
    }

    setSelectedRows(selectedRows: Array<any>): void {
        this.selectedRows = selectedRows;
        this.updateRows();
    }

    setSelectedColumns(selectedColumns: Array<any>): void {
        this.selectedColumns = selectedColumns;
        this.updateColumns();
    }


    setData(data: Array<any>): void {
        this.data = data;
        this.createRows();
    }

    getData(): Array<any> {
        return this.data;
    }


    getColumns(): Array<Column> {
        return this.columns;
    }

    getRows(): Array<Row> {
        return this.rows;
    }

    getSelectedRows(): Array<Row> {
        return this.rows.filter((row: Row) => row.isSelected === true);
    }


    findRowByData(data: any): Row {
        return this.rows.find((row: Row) => row.getData() === data);
    }

    deselectAll(): void {
        this.rows.forEach((row: Row) => {
            row.isSelected = false;
        });
    }

    selectRow(row: Row): Row {
        //this.deselectAll();

        row.isSelected = true;
        this.selectedRow = row;

        return this.selectedRow;
    }


    selectPreviousRow(): Row {
        if (this.rows.length > 0) {
            let index = this.selectedRow ? this.selectedRow.id : 0;
            if (index > this.rows.length - 1) {
                index = this.rows.length - 1;
            }
            this.selectRow(this.rows[index]);
            return this.selectedRow;
        }
    }

    selectFirstRow(): Row {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[0]);
            return this.selectedRow;
        }
    }

    selectLastRow(): Row {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[this.rows.length - 1]);
            return this.selectedRow;
        }
    }


    select(): Row {
        if (this.getRows().length === 0) {
            return;
        }
        return this.selectedRow;
    }

    createNewRow(): void {
        this.newRow = new Row('0', {}, this, false);
    }

    /**
     * Create columns by mapping from the settings
     * @param settings
     * @private
     */
    createColumns(settings: any) {
        this.columns = [];
        for (let id in settings.columns) {
            if (id) {
                let newColumn = new Column(id, settings.columns[id], this, settings.uniqueTemplateMap);
                this.columns.push(newColumn);
                if (this.selectedColumns) {
                    this.selectedColumns.forEach(selectedColumn => {
                        if (id === selectedColumn.id) {
                            newColumn.isVisible = selectedColumn.selected;
                            return false;
                        }
                    });
                }
            }
        }
    }


    updateColumns() {
        this.columns.forEach((column: Column) => {
            if (this.selectedColumns) {
                this.selectedColumns.forEach(selectedColumn => {
                    if (column.id === selectedColumn.id) {
                        column.isVisible = selectedColumn.selected;
                    }
                });

            }
        });


    }

    updateRows() {
        this.rows.forEach((row: Row) => {
            if (this.selectedRows) {
                this.selectedRows.forEach((selectedRow: SmartTableSelectionData) => {
                    let selectedId = (selectedRow as Object).hasOwnProperty('id')?(selectedRow as Object)['id']: selectedRow.getId();
                    if (row.id === selectedId) {
                        let isSelected:boolean= (selectedRow as Object).hasOwnProperty('selected')?(selectedRow as Object)['selected']:selectedRow.isSelected();
                        row.setSelected(isSelected);
                    }
                });

            }
        });


    }

    /**
     * Create rows based on current data prepared in data source
     * @private
     */
    protected createRows() {
        this.rows = [];
        this.data.forEach((el, index) => {
            let newRow: Row = new Row(el.id, el, this, false);
            this.rows.push(newRow);
        /*   if (this.selectedRows) {
                this.selectedRows.forEach(selectedRow => {
                    if (el.id === selectedRow.id) {
                        newRow.setSelected(selectedRow.selected);
                        return false;
                    }
                });

        } */
        });
    }
}

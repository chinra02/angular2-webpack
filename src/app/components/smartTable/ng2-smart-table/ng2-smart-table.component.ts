import { RowActionModel } from './../../../model/actions/smart-table-action.model';
import { SmartTableSelectionData } from './../../../model/actions/smart-table-rows-selections.model';
import { ObjectUtils } from './../../../utils/object-utils';
import { Cell } from './lib/data-set/cell';
import { Column } from './lib/data-set/column';
import { Row } from './lib/data-set/row';
import { DataSource } from './lib/data-source/data-source';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Grid } from './lib/grid';
import { deepExtend } from './lib/helpers';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange
} from '@angular/core';

@Component({
    selector: 'ng2-smart-table',
    moduleId: module.id,
    styleUrls: ['./ng2-smart-table.scss'],
    templateUrl: 'ng2-smart-table.html'


})
export class Ng2SmartTableComponent implements OnChanges {
    // DoCheck,AfterViewChecked, AfterViewInit {

    @Input() source: any;
    @Input() settings: any;
    @Input() selectAll: any;
    @Input() selectedRows: any;
    @Input() selectedColumns: any;
    @Input() selectedPager: any;
    @Input() selectedSort: Array<any>;
    @Input() rowActionModel: RowActionModel;
    @Input() quickViewTemplateUrl: string;

    @Output() public rowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() public userRowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() public create: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onSelectedRowAction: EventEmitter<any> = new EventEmitter<any>();

    @Output() public createConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() public paginated: EventEmitter<any> = new EventEmitter<any>();
    @Output() public pagsChanged: EventEmitter<any> = new EventEmitter<any>();
    @Output() public rowSelectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public columnSelectionChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() public sorted: EventEmitter<any> = new EventEmitter<any>();
    @Output() public searched: EventEmitter<any> = new EventEmitter<any>();
    @Output() public rowClicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onPreviousEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onNextEvent: EventEmitter<any> = new EventEmitter<any>();


    protected grid: Grid;
    protected dataSource: DataSource;
    protected pagerData = { page: 1, perPage: 50 };
    protected defaultSettings: Object = {

        hideHeader: false,
        hideSubHeader: false,
        selector: 'check', // Currently checkbox is the default selector and the only selector for now.
        pageRows: [{ 'label': 10 }, { 'label': 15 }, { 'label': 25 }, { 'label': 50 }, { 'label': 100 }, { 'label': 1000 }],
        columns: {},
        pager: {
            display: true,
            perPage: 50
        }
    };
    colSpanLength: number;
    isModalOpen: boolean = false;

    protected getColumns() {
        return this.grid.getColumns();
    }

    protected getRows() {
        return this.grid.getDataSet().getRows();
    }

    protected getColSpanLength() {
        return this.getColumns().length + 1;
    }

    protected getCells(row: Row) {
        return row.getCells().filter((cell: Cell) => {
            return cell.isVisible === true;
        });

    };


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (this.grid) {
            if (changes['settings']) {
                this.grid.updateSettings(this.prepareSettings());
                if (!ObjectUtils.isEmptyArray(this.grid.getRows()))
                    this.grid.getDataSource().refresh();
            }
            if (changes['source']) {
                let data: any = changes['source'].currentValue;
                if (this.dataSource) {
                    this.grid.getDataSource().load(data);
                }
                else {
                    this.dataSource = this.prepareSource();
                    this.grid.setSource(this.dataSource);

                }

            }
            this.updateComponentFromState();

        } else {
            this.initGrid();

        }

    }

    private updateComponentFromState() {
        if (this.selectedPager && this.selectedPager.page && this.selectedPager.perPage) {
            this.grid.getDataSource().setPaging(this.selectedPager.page, this.selectedPager.perPage, false);
            this.pagerData.page = this.selectedPager.page;
            this.pagerData.perPage = this.selectedPager.perPage;
        }
        if (this.selectedSort && this.selectedSort.length > 0) {
            this.grid.getDataSource().setSort(this.selectedSort, false);
        }
        this.grid.getDataSet().setSelectedRows(this.selectedRows);
        this.grid.getDataSet().setSelectedColumns(this.selectedColumns);
        // this.changeDetectRef.markForCheck();
    }

    private onAdd(event: any): boolean {
        event.stopPropagation();
        if (this.grid.getSetting('mode') === 'external') {
            this.create.emit({
                source: this.dataSource
            });
        } else {
            this.grid.createFormShown = true;
        }
        return false;
    }

    private onUserSelectRow(row: Row): void {
        this.grid.selectRow(row);
        this.userRowSelect.emit({
            data: row.getData(),
            source: this.dataSource
        });

        this.onSelectRow(row);
    }

    private onSelectRow(row: Row): void {
        this.grid.selectRow(row);
        this.rowSelect.emit({
            data: row.getData(),
            source: this.dataSource
        });

    }


    private onCreate(row: Row, event: any): boolean {
        event.stopPropagation();

        this.grid.create(row, this.createConfirm);
        return false;
    }

    protected initGrid(): void {
        this.dataSource = this.prepareSource();
        this.grid = new Grid(this.dataSource, this.prepareSettings());
        this.grid.onSelectRow().subscribe((row) => this.onSelectRow(row));
    }

    protected prepareSource(): DataSource {
        if (this.source instanceof DataSource) {
            return this.source;
        } else if (this.source instanceof Array) {
            return new LocalDataSource(this.source);
        }

        return new LocalDataSource();
    }

    protected prepareSettings(): Object {
        return deepExtend({}, this.defaultSettings, this.settings);
    }

    protected onHeaderSelectAll(event): void {
        this.onSelectAll(event.selectedValue);
      
    }

    protected onSelectAll(selectedValue: any): void {
        this.selectAll = selectedValue;
        this.updateRowSelections(selectedValue);

    }

    protected onRowSelection(event, row: Row) {
        row.isSelected = event.selectedValue;
        let rowsSelection: Array<any> = new Array<any>();
        rowsSelection.push({ id: row.id, selected: row.isSelected });
        this.rowSelectionChange.emit(rowsSelection);
       
    }

    protected updateRowSelections(selectedValue: any): void {
        let rowsSelection: Array<any> = new Array<any>();

        this.getRows().forEach((row: Row) => {
            row.isSelected = selectedValue;
            rowsSelection.push({ id: row.id, selected: row.isSelected });
        });
        this.rowSelectionChange.emit(rowsSelection);
      
    }

    protected onPaginate(event) {
        this.pagerData.page = event.page;
        this.pagerData.perPage = event.perPage;
        this.paginated.emit(this.pagerData);
        
    }

    // This is parent onColumnFilterChange, whih is a caller
    protected onColumnFilterChange(event) {
        let passedColumn: Column = event.selectedOption;
        let isColumnSelected = event.selectedValue;
        let columnsSelection: Array<SmartTableSelectionData> = new Array<SmartTableSelectionData>();
        this.grid.getDataSet().getColumns().forEach((columnItem: Column) => {
            if (columnItem.uniqueId === passedColumn.uniqueId) {
                columnItem.isVisible = isColumnSelected;
                this.handleRowsForColumnFilter(columnItem);
                return false;
            }
            columnsSelection.push(new SmartTableSelectionData(columnItem.id, columnItem.isVisible));

        });
        this.columnSelectionChange.emit(this.grid.getAllColumns());
     

    }

    protected handleRowsForColumnFilter(columnItem: Column) {
        this.grid.getDataSet().getRows().forEach(function (rowItem: Row) {
            rowItem.getCells().forEach(function (cell: Cell) {
                if (cell.getColumn().uniqueId === columnItem.uniqueId) {
                    cell.isVisible = columnItem.isVisible;
                    return true;
                }

            });
        });

    }

    protected onPageSizeChange(event): void {
        let perPage = event.selectedPage;
        this.pagerData.perPage = perPage;
        this.dataSource.setPaging(1, perPage, true);
        this.pagsChanged.emit(this.pagerData);
    }

    protected onColumnSort(sorts: Array<any>): void {
        this.sorted.emit(sorts);
        
    }

    protected onRowAction(event, selectedRow) {
        event.selectedRow = selectedRow;
        this.onSelectedRowAction.emit(event);
  
    }

    protected onRowClick(event: Event, row: Row) {
        this.rowClicked.emit(row);
        if (ObjectUtils.isNotNullAndUndefined(this.quickViewTemplateUrl)) {
            this.getRows().forEach((innerRow: Row) => {
                innerRow.isQuickViewOpen = row.id === innerRow.id;
            });
        }

    }

    protected onNext(row: Row) {
        this.moveQuickViewNext(row);

    }

    protected moveQuickViewNext(row: Row) {
        row.isQuickViewOpen = false;
        let nextRow = this.grid.getNextRow(row);
        if (ObjectUtils.isNotNullAndUndefined(nextRow)) {
            nextRow.isQuickViewOpen = true;
        }
        else {
            this.onNextEvent.emit(row);
        }
    }

    protected moveQuickViewPrevious(row: Row) {
        row.isQuickViewOpen = false;
        let previousRow = this.grid.getPreviousRow(row);
        if (ObjectUtils.isNotNullAndUndefined(previousRow)) {
            previousRow.isQuickViewOpen = true;
        }
        else {
            this.onPreviousEvent.emit(row);
        }
    }

    protected onPrevious(row: Row) {
        this.moveQuickViewPrevious(row);
    }

    protected onModalNext(row: Row) {
        this.isModalOpen = true;
        this.moveQuickViewNext(row);
    }

    protected onModalPrevious(row: Row) {
        this.isModalOpen = true;
        this.moveQuickViewPrevious(row);
    }

    protected onQuickViewClose(row: Row) {
        let rowIndex: number = this.grid.getRowIndex(row);
        this.grid.getRows()[rowIndex].isQuickViewOpen = false;
    }

}

import { RowActionModel } from './../../../model/actions/smart-table-action.model';
import { SmartTableSelectionData } from './../../../model/actions/smart-table-rows-selections.model';
import { SmartTableActionService } from './../../../services/smart-table-actions.service';
import { ObjectUtils } from './../../../utils/object-utils';
import { Cell } from './lib/data-set/cell';
import { Column } from './lib/data-set/column';
import { Row } from './lib/data-set/row';
import { DataSource } from './lib/data-source/data-source';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Grid } from './lib/grid';
import { deepExtend } from './lib/helpers';
import { PagerModel } from './lib/pager.model';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';

@Component({
    selector: 'ng2-smart-table',
    moduleId: module.id,
    styleUrls: ['./ng2-smart-table.scss'],
    templateUrl: 'ng2-smart-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class Ng2SmartTableComponent implements OnChanges, OnInit {
    // DoCheck,AfterViewChecked, AfterViewInit {

    @Input() source: any;
    @Input() settings: any;
    @Input() selectedRows: Array<any> = new Array();
    @Input() selectedColumns: any;
    @Input() selectedPager: any;
    @Input() selectedSort: Array<any>;
    @Input() columnSearch: Array<any>;
    @Input() rowActionModel: RowActionModel;
    @Input() quickViewTemplateUrl: string;
    @Input() pageData: PagerModel;
    @Input() isRestSort: boolean;
    @Input() isSmartSelectorEnabled: boolean = true;

    @Output() public rowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() public userRowSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() public create: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onSelectedRowAction: EventEmitter<any> = new EventEmitter<any>();

    @Output() public createConfirm: EventEmitter<any> = new EventEmitter<any>();
    @Output() public paginated: EventEmitter<any> = new EventEmitter<any>();
    @Output() public stateChanged: EventEmitter<any> = new EventEmitter<any>();
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
    protected stateChanges: any = { pager: null, sort: null, searchParam: null };
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

    constructor(private changeDetectRef: ChangeDetectorRef, protected actionService: SmartTableActionService) {
    }

    protected getColumns() {
        return this.grid.getColumns();
    }


    protected isRowActionModelAvilable() {
        return (ObjectUtils.isNotNullAndUndefined(this.rowActionModel) && !Array.isArray(this.rowActionModel));
    }

    protected getRows() {
        return this.grid.getDataSet().getRows();
    }

    protected isAllRowsSelected() {
        let isAllSelected = true;
        if (ObjectUtils.isEmptyArray(this.getRows())) {
            isAllSelected = false;
        }
        else {
            this.getRows().forEach(row => {
                if (!row.isSelected)
                    isAllSelected = false;
            });
        }
        return isAllSelected;
    }

    protected getColSpanLength() {
        return this.getColumns().length + 1;
    }

    protected getCells(row: Row) {
        return row.getCells().filter((cell: Cell) => {
            return cell.getColumn().isVisible === true;
        });

    };

    ngOnInit() {
        this.dataSource.isRestSort = this.isRestSort;
        this.updateComponentFromState();
        if (this.rowActionModel == null) {
            this.isSmartSelectorEnabled = false;
        }

    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (this.grid) {
            if (changes['settings']) {
                this.grid.updateSettings(this.prepareSettings());

            }
            if (changes['source']) {
                this.setSource(changes['source'].currentValue);

            }

        } else {
            this.initGrid();

        }


    }

    private setSource(data) {
        if (this.dataSource) {
            this.grid.getDataSource().load(data);
            if (this.pageData) {
                this.dataSource.getPagerDataChangeSource().next(this.pageData);
            }
            else {
                this.dataSource.setPaging(this.pagerData.page, this.pagerData.perPage, false);
            }
        }
        else {
            this.dataSource = this.prepareSource();
            this.grid.setSource(this.dataSource);

        }
    }

    private updateComponentFromState() {
        this.updatePagerState();
        this.updateSortState();
        this.grid.getDataSet().setSelectedColumns(this.selectedColumns);
        this.loadSearchParamsToState();
        this.stateChanged.emit(this.stateChanges);
    }

    private updatePagerState() {
        if (this.selectedPager && this.selectedPager.page && this.selectedPager.perPage) {
            this.pagerData.page = this.selectedPager.page;
            this.pagerData.perPage = this.selectedPager.perPage;
            if (this.pageData) {
                this.stateChanges.pager = {
                    page: this.pagerData.page,
                    perPage: this.pagerData.perPage
                }
            }

        }
        else {
            this.stateChanges.pager = {
                page: 1,
                perPage: this.pagerData.perPage
            }
        }
    }

    private updateSortState() {
        if (!ObjectUtils.isEmptyArray(this.selectedSort)) {
            if (this.isRestSort) {
                this.stateChanges.sorts = this.selectedSort;
            }
            this.grid.getDataSource().setSort(this.selectedSort);
        }
    }

    private loadSearchParamsToState() {
        if (this.columnSearch) {
            this.stateChanges.searchParams = ObjectUtils.joinObjectPropertyValues(this.columnSearch, 'param', ',');;
        }
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
        this.dataSource.onChanged().subscribe((changes) => {
            this.changeDetectRef.markForCheck();
        });
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
        this.changeDetectRef.markForCheck();
    }

    protected onSelectAll(selectedValue: any): void {
        this.updateRowSelections(selectedValue);

    }

    protected onRowSelection(event, row: Row) {
        row.isSelected = event.selectedValue;
        let rowsSelection: Array<any> = new Array<any>();
        rowsSelection.push({ id: row.id, selected: row.isSelected });
        this.selectedRows = ObjectUtils.crudRightToLeft(this.selectedRows, rowsSelection);
        this.grid.getDataSet().setSelectedRows(this.selectedRows);
        this.rowSelectionChange.emit(rowsSelection);
        //this.changeDetectRef.markForCheck();
    }

    protected updateRowSelections(selectedValue: any): void {
        let rowsSelection: Array<any> = new Array<any>();

        this.getRows().forEach((row: Row) => {
            row.isSelected = selectedValue;
            rowsSelection.push({ id: row.id, selected: row.isSelected });
        });
        this.selectedRows = ObjectUtils.crudRightToLeft(this.selectedRows, rowsSelection);
        this.grid.getDataSet().setSelectedRows(this.selectedRows);
        this.rowSelectionChange.emit(rowsSelection);
        this.changeDetectRef.markForCheck();
    }

    protected onPaginate(event) {
        this.pagerData.page = event.page;
        this.pagerData.perPage = event.perPage;
        this.paginated.emit(this.pagerData);
        this.changeDetectRef.markForCheck();
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
        this.changeDetectRef.markForCheck();

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
        this.pagerData.page = 1;
        if (ObjectUtils.isNullOrUndefined(this.pageData)) {
            this.dataSource.setPaging(1, perPage, true);
        }
        this.paginated.emit(this.pagerData);


    }

    protected onColumnSort(sorts: Array<any>): void {
        this.sorted.emit(sorts);
        this.changeDetectRef.markForCheck();
    }

    protected onRowAction(event, selectedRow) {
        event.selectedRow = selectedRow;
        this.onSelectedRowAction.emit(event);
        this.changeDetectRef.markForCheck();
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

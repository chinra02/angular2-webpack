import { SmartTableSelectionData } from '../../model/actions/smart-table-rows-selections.model';
import { SmartTableActionService } from '../../services/smart-table-actions.service';
import { SmartTableColumnService } from '../../services/smart-table-column.service';
import { SmartTableStorageActions } from './../../actions/smart-table/smart-table-storage.actions';
import {
    BaseActionParams,
    BulkActionParams,
    HeaderActionParams,
    RowActionParams
} from './../../model/actions/smart-table-action-params.model';
import { SmartTableActionModel } from './../../model/actions/smart-table-action.model';
import { LocalStorageService } from './../../services/local-storage.service';
import { ObjectUtils } from './../../utils/object-utils';
import { ActionConfirmModalComponent } from './../confirm-modal/action-confirm-modal.component';
import { Column } from './ng2-smart-table/lib/data-set/column';
import { PagerModel } from './ng2-smart-table/lib/pager.model';
import { Ng2SmartTableComponent } from './ng2-smart-table/ng2-smart-table.component';
import { SmartTableSearchService } from './services/smart-table-search.service';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnChanges,
    SimpleChange
} from '@angular/core';
import { EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';


@Component({
    selector: 'smart-table-component',
    moduleId: module.id,
    templateUrl: './smart-table.component.html',
    providers: [Ng2SmartTableComponent, SmartTableSearchService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class SmartTableComponent implements OnChanges, OnInit {

    @ViewChild(ActionConfirmModalComponent) confirm: ActionConfirmModalComponent;

    @Input() protected columnJson: string;
    @Input() protected data: Array<Object>;
    @Input() protected storageKey: string;
    @Input() quickViewTemplateUrl: string;
    @Input() protected actionModel: SmartTableActionModel;
    @Input() protected pagerData: PagerModel; //Supports pagination with rest
    @Input() isRestSort: boolean = true; // //Setting true supports sorting with rest

    @Output() onHeaderEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onBulkEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output() onColumnSortEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPaginateEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onColumnSearchEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowClickEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPreviousRowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNextRowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() stateChanged: EventEmitter<any> = new EventEmitter<any>();


    settingsSource: Subject<any> = new Subject<any>();
    settings$: Observable<any> = this.settingsSource.asObservable();

    columnService: SmartTableColumnService;
    searchService: SmartTableSearchService;

    private smartTableStorageActions: SmartTableStorageActions;
    protected smarTableSearchParms: Array<any> = new Array<any>();

    sortSelections: any;
    columnSelections: any;
    pagerSelections: any;
    rowSelections: any;
    columnSearch: any;

    constructor(private injector: Injector, private changeDetectRef: ChangeDetectorRef, protected actionService: SmartTableActionService, protected localStorageService: LocalStorageService) {

        this.columnService = injector.get(SmartTableColumnService);
        this.searchService = injector.get(SmartTableSearchService);
        this.smartTableStorageActions = injector.get(SmartTableStorageActions);

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['columnJson']) {
            this.setSettings(this.columnJson);

        }
        if (changes['storageKey']) {
            this.localStorageService.updateKey(this.storageKey);

        }

    }

    ngOnInit() {
        this.initConfirmationMessageSubscribe();
        this.initActionSubscribe();
        this.initSearchSubscribe();
        this.getSmarTableStateFromStore();

    }


    private initSearchSubscribe() {
        this.searchService.onSearchAsObservable().subscribe(searchParam => {
            let searchString = this.searchService.getSearchString(this.smarTableSearchParms, searchParam);
            this.onColumnSearchEvent.emit(searchString);
            this.smartTableStorageActions.onColumnSearch({
                tableName: this.storageKey,
                searchParams: searchParam
            });
        });
        this.searchService.onClearSearchAsObservable().subscribe(searchParam => {
            let matchedItem = ObjectUtils.contains(this.smarTableSearchParms, searchParam, 'key');
            this.smarTableSearchParms = this.smarTableSearchParms.filter(searchParam => searchParam.key != matchedItem.key);
            let searchString = ObjectUtils.joinObjectPropertyValues(this.smarTableSearchParms, 'param', ',');
            searchParam.param = '';
            this.onColumnSearchEvent.emit(searchString);
            this.smartTableStorageActions.onColumnSearch({
                tableName: this.storageKey,
                searchParams: searchParam
            });
        })
    }

    private getSmarTableStateFromStore() {
        this.sortSelections = this.localStorageService.select(['smartTable', 'smartTableSort'], null, 'sorts');
        //this.rowSelections = this.localStorageService.select(['smartTable', 'smartTableRowSelection'], null, 'rows'); //Commenting this not to get the row selections to store
        this.rowSelections = new Array<any>();
        this.columnSelections = this.localStorageService.select(['smartTable', 'smartTableColumnSelection'], null, 'columns');
        this.pagerSelections = this.localStorageService.select(['smartTable', 'smartTablePager'], null, 'pager');
        this.columnSearch = this.localStorageService.select(['smartTable', 'smartTableColumnSearch'], null, 'searchParams');
        if (!ObjectUtils.isEmptyArray(this.columnSearch)) {
            this.smarTableSearchParms = this.smarTableSearchParms.concat(this.columnSearch);
            this.searchService.getSearchStateSource().next(this.columnSearch);

        }
    }

    private initConfirmationMessageSubscribe() {
        this.actionService.onActionConfirmationMessageResp().subscribe((param: BaseActionParams) => {
            this.confirm.showConfirm(param);
        });
    }


    private initActionSubscribe() {
        this.actionService.onActionConfirmation().subscribe((param: BaseActionParams) => {
            if (param instanceof BulkActionParams) {
                this.actionService.getPerformedBulkActionSource().next(param);
            }
            else if (param instanceof HeaderActionParams) {
                this.actionService.getPerformedHeaderActionSource().next(param);
            }
            else if (param instanceof RowActionParams) {
                this.actionService.getPerformedRowActionSource().next(param);
            }

        });
    }

    private setSettings(columnJsonName: string) {
        if (columnJsonName) {
            this.columnService.getColumns(columnJsonName).subscribe(columns => {
                let settings = {
                    hideHeader: false,
                    hideSubHeader: true,
                    columns: columns,
                    actions: null,
                    pageRows: [
                        { 'id': 10, 'label': 10 }, { 'id': 15, 'label': 15 },
                        { 'id': 25, 'label': 25 }, { 'id': 50, 'label': 50 },
                        { 'id': 100, 'label': 100 }, { 'id': 1000, 'label': 1000 }],
                    pager: {
                        display: true,
                        perPage: 50
                    }
                };

                this.settingsSource.next(settings);

            });

        }

    };

    protected onPaginate(event) {
        this.onPaginateEvent.emit(event);
        this.smartTableStorageActions.onPaginate({
            tableName: this.storageKey,
            pager: event
        });
    }

    protected onPageSizeChanged(event) {
        this.onPaginateEvent.emit(event);
        this.smartTableStorageActions.onPaginate({
            tableName: this.storageKey,
            pager: event
        });
        // PlaceHolder to propagate onPageSizeChanged event
    }

    protected onRowSelectionChange(rows: Array<any> = new Array<any>()) {
        this.actionService.getRowSelectionSource().next(rows);
        // PlaceHolder to propagate onRowSelectionChange event
        let rowsSelection: Array<SmartTableSelectionData> = new Array<SmartTableSelectionData>();
        rows.forEach((row: any) => {
            rowsSelection.push(new SmartTableSelectionData(row.id, row.selected));
        });
        /* Commenting this not to get the row selections to store

        this.smartTableStorageActions.onRowSelectionChange({
            tableName: this.storageKey,
            rows: rowsSelection
        }); */
    }

    protected onColumnSelectionChange(columns: Array<Column>) {
        let columnsSelection: Array<SmartTableSelectionData> = new Array<SmartTableSelectionData>();
        columns.forEach((column: Column) => {
            columnsSelection.push(new SmartTableSelectionData(column.id, column.isVisible));
        });
        this.changeDetectRef.markForCheck();
        this.smartTableStorageActions.onColumnSelectionChange({
            tableName: this.storageKey,
            columns: columnsSelection
        });
        // PlaceHolder to propagate onRowSelectionChange event
    }

    protected onColumnSort(sorts: [{ field: 'temp', direction: 'asc', compare: any }]) {
        this.onColumnSortEvent.emit(sorts);
        this.smartTableStorageActions.onColumnSort({
            tableName: this.storageKey,
            sorts: sorts
        });


    }

    protected onHeaderAction(event) {
        let headerActionParam: HeaderActionParams = new HeaderActionParams();
        headerActionParam.selectedRows = event.selectedRows;
        headerActionParam.selectedHeaderAction = event.selectedOption;
        if (ObjectUtils.isNotNullAndUndefined(headerActionParam.selectedHeaderAction.$confirmFunc)) {
            this.actionService.getActionConfirmationMessageSource().next(headerActionParam);
        }
        else {
            this.actionService.getPerformedHeaderActionSource().next(headerActionParam);
        }

    }

    protected onRowAction(event) {
        let rowActionParam: RowActionParams = new RowActionParams();
        rowActionParam.selectedRows = [event.selectedRow];
        rowActionParam.selectedRowAction = event.selectedOption;
        if (ObjectUtils.isNotNullAndUndefined(rowActionParam.selectedRowAction.$confirmFunc)) {
            this.actionService.getActionConfirmationMessageSource().next(rowActionParam);
        }
        else {
            this.actionService.getPerformedRowActionSource().next(rowActionParam);
        }

    }

    protected onBulkAction(event) {
        let bulkActionParams: BulkActionParams = new BulkActionParams();
        bulkActionParams.selectedBulkAction = event.selectedOption;
        bulkActionParams.selectedRows = event.rowSelections;
        if (ObjectUtils.isNotNullAndUndefined(bulkActionParams.selectedBulkAction.$confirmFunc)) {
            this.actionService.getActionConfirmationMessageSource().next(bulkActionParams);
        }
        else {
            this.actionService.getPerformedBulkActionSource().next(bulkActionParams);
        }

    }

    onRowClick(event: any) {
        this.onRowClickEvent.emit(event);
    }

    onPrevious(event) {
        this.onPreviousRowEvent.emit(event);
    }

    onNext(event) {
        this.onNextRowEvent.emit(event);
    }



}
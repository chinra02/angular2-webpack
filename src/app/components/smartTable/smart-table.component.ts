import { INITIAL_COMPONENT_STATE, COMPONENTS_REDUCERS } from './../../store/index';
import { SmartTableSelectionData } from './../../model/actions/smart-table-rows-selections.model';
import { select } from '../../decorators/select';
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
import { Row } from './ng2-smart-table/lib/data-set/row';
import { Ng2SmartTableComponent } from './ng2-smart-table/ng2-smart-table.component';
import { SmartTableSearchService } from './services/smart-table-search';
import { Component, Injector, Input, OnChanges, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';



@Component({
    selector: 'smart-table-component',
    moduleId: module.id,
    templateUrl: './smart-table.component.html',
    providers: [Ng2SmartTableComponent, SmartTableSearchService, SmartTableStorageActions, LocalStorageService],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class SmartTableComponent implements OnChanges, OnInit {

    @ViewChild(ActionConfirmModalComponent) confirm: ActionConfirmModalComponent;

    @Input() protected columnJson: string;
    @Input() protected data: Array<Object>;
    @Input() protected storageKey: string;
    // Actions feed
    @Input() protected actionModel: SmartTableActionModel;

    @Output() onHeaderEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onBulkEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output() onColumnSortEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPaginateEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onColumnSearchEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRowClickEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onPreviousRowEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNextRowEvent: EventEmitter<any> = new EventEmitter<any>();


    settingsSource: Subject<any> = new Subject<any>();
    settings$: Observable<any> = this.settingsSource.asObservable();
    dataSource: Subject<any> = new Subject<any>();
    dataSource$ = this.dataSource.asObservable();

    columnService: SmartTableColumnService;
    actionService: SmartTableActionService;
    searchService: SmartTableSearchService;

    private smartTableStorageActions: SmartTableStorageActions;


    @select(['smartTable', 'smartTableSort']) sortSelections$: Observable<Object>;
    @select(['smartTable', 'smartTableColumnSelection']) columnSelections$: Observable<Object>;
    @select(['smartTable', 'smartTablePager']) pagerSelections$: Observable<Object>;
    @select(['smartTable', 'smartTableRowSelection']) rowSelections$: Observable<Object>;  


    constructor(private injector: Injector, private changeDetectRef: ChangeDetectorRef,private localStorageService:LocalStorageService) {

        this.columnService = injector.get(SmartTableColumnService);
        this.actionService = injector.get(SmartTableActionService);
        this.searchService = injector.get(SmartTableSearchService);
        this.smartTableStorageActions = injector.get(SmartTableStorageActions);

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['columnJson']) {
            this.setSettings(this.columnJson);

        }

        if (changes['data'])
            this.dataSource.next(this.data);
        if (changes['storageKey']){
           this.localStorageService.createStorage(INITIAL_COMPONENT_STATE,COMPONENTS_REDUCERS,this.storageKey);
        }
            
    }

    ngOnInit() {
        this.initConfirmationMessageSubscribe();
        this.initActionSubscribe();
        this.initSearchSubscribe();

    }

    private initConfirmationMessageSubscribe() {
        this.actionService.onActionConfirmationMessageResp().subscribe((param: BaseActionParams) => {
            this.confirm.showConfirm(param);
        });
    }

    private initSearchSubscribe() {
        this.searchService.onSearchAsObservable().subscribe(searchParam => {
            this.onColumnSearchEvent.emit(searchParam);
            this.smartTableStorageActions.onColumnSearch(searchParam);
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
        this.smartTableStorageActions.onPaginate(event);
    }

    protected onPageSizeChanged(event) {
        this.smartTableStorageActions.onPaginate(event);
        // PlaceHolder to propagate onPageSizeChanged event
    }

    protected onRowSelectionChange(rows: Array<Row> = new Array<any>()) {
        this.actionService.getRowSelectionSource().next(rows);
        // PlaceHolder to propagate onRowSelectionChange event
        let rowsSelection: Array<SmartTableSelectionData> = new Array<SmartTableSelectionData>();
        rows.forEach((row: Row) => {
            rowsSelection.push(new SmartTableSelectionData(row.id, row.isSelected));
        });
        this.changeDetectRef.markForCheck();
        this.smartTableStorageActions.onRowSelectionChange(rowsSelection);
    }

    protected onColumnSelectionChange(columns: Array<Column>) {
        let columnsSelection: Array<SmartTableSelectionData> = new Array<SmartTableSelectionData>();
        columns.forEach((column: Column) => {
            columnsSelection.push(new SmartTableSelectionData(column.id, column.isVisible));
        });
        this.changeDetectRef.markForCheck();
        this.smartTableStorageActions.onColumnSelectionChange(columnsSelection);
        // PlaceHolder to propagate onRowSelectionChange event
    }

    protected onColumnSort(sorts: Array<any>) {
        this.onColumnSortEvent.emit(sorts);
        this.smartTableStorageActions.onColumnSort(sorts);

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
import { SmartTableModalEventsService } from './../../../services/smart-table-modal-events';
import { LocalSorter } from './../../lib/data-source/local/local.sorter';
import { SmartTableSearchService } from '../../../services/smart-table-search.service';
import { ObjectUtils } from './../../../../../utils/object-utils';
import { DataSource } from '../../lib/data-source/data-source';
import { TemplateModal } from '../modal/template-modal.component';
import { Column } from './../../lib/data-set/column';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';


@Component({
    selector: 'ng2-smart-table-title',
    // styleUrls: ['title.scss'],
    templateUrl: './title.component.html',
    providers: [TemplateModal]
})
export class TitleComponent implements OnChanges {

    @Input() column: Column;
    @Input() source: DataSource;
    @Input() currentDirection: string = 'sort-ctrls';
    @Input() isRestSort: boolean;
    @Output() public sorted: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeOutSide: EventEmitter<any> = new EventEmitter<any>();
    isFormVisible: boolean = false;
    columnType: string;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['column'])
            this.columnType = this.column.templateModel.$type;
    }

    constructor(private searchService: SmartTableSearchService,private modalEvents:SmartTableModalEventsService) { }

    ngOnInit(): void {
        if (this.source) {
            this.source.onChanged().subscribe((elements) => {
                let sortConf = this.source.getSort();

                if (sortConf.length > 0 && sortConf[0]['field'] === this.column.attr) {
                    this.currentDirection = LocalSorter.getLongSortDirection(sortConf[0]['direction']);
                } else {
                    this.currentDirection = '';
                }

            });
        }

        this.modalEvents.getCloseModalSource().subscribe(()=>this.isFormVisible = false);
        this.modalEvents.getOpenModalSource().subscribe((inColumn:Column)=>this.isFormVisible = inColumn.uniqueId === this.column.uniqueId);

    }

    private showModal(event: any) {
        this.modalEvents.openModal(this.column);

    }

    private closeModal(event){
     this.modalEvents.closeModal();
    }

    private sort(): boolean {
        this.currentDirection = LocalSorter.changeSortDirection(this.currentDirection,this.column.sortDirection);
        let sorts: Array<any> = [
            {
                field: this.column.attr,
                direction: LocalSorter.getShortSortDirection(this.currentDirection),
                compare: null
            }
        ];
        this.source.setSort(sorts);
        this.sorted.emit(sorts);
        return false;
    }

    



}

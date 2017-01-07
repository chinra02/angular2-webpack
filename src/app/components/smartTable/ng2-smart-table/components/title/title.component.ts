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
    @Output() public sorted: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeOutSide: EventEmitter<any> = new EventEmitter<any>();
    isFormVisible: boolean = false;
    columnType: string;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['column'])
            this.columnType = this.column.templateModel.$type;
    }

    ngOnInit(): void {
        if (this.source) {
            this.source.onChanged().subscribe((elements) => {
                let sortConf = this.source.getSort();

                if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id) {
                    this.currentDirection = sortConf[0]['direction'];
                } else {
                    this.currentDirection = '';
                }
     
            });
        }

    }

    private showModal(event: any) {
        this.isFormVisible = true;

    }

    private sort(): boolean {
        this.changeSortDirection();
        let sorts: Array<any> = [
            {
                field: this.column.id,
                direction: this.currentDirection,
                compare: null
            }
        ];
        this.source.setSort(sorts);
        this.sorted.emit(sorts);
        return false;
    }

    private changeSortDirection(): string {
        if (this.currentDirection) {
            this.currentDirection = this.currentDirection === 'st-multi-sort-ascent' ? 'st-multi-sort-descent' : 'st-multi-sort-ascent';
        } else {
            this.currentDirection = this.column.sortDirection;
        }
        return this.currentDirection;
    }

}

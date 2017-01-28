import { SmartTableSearchService } from '../../../services/smart-table-search.service';
import { EventEmitter } from '@angular/forms/src/facade/async';
import { ObjectUtils } from './../../../../../utils/object-utils';
import { Column } from '../../lib/data-set/column';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChange, OnInit, Output } from '@angular/core';
@Component({
    selector: 'search-description',
    templateUrl: './search-description.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchDescriptionComponent implements OnChanges, OnInit {
    @Input() uniqueId: string;
    @Input() context: any;
    @Input() templateHtml: string;
    @Input() column: Column;


    descriptType: string;
    value: any;
    type: string;
    searchParam: any;

    constructor(private changeDetectionRef: ChangeDetectorRef, private searchService: SmartTableSearchService) { }

    ngOnInit() {
        this.searchService.onSearchAsObservable().subscribe((searchParam: any) => {
            if (ObjectUtils.isNotNullAndUndefined(searchParam) && this.column.attr === searchParam.key) {
                this.updateComponent(searchParam);
            }
        });

        this.searchService.onSearchStateAsObservable().subscribe((columnSearch: Array<any>) => {
            if (columnSearch) {
                columnSearch.forEach(searchParam => {
                    if (ObjectUtils.isNotNullAndUndefined(searchParam) && this.column.attr === searchParam.key) {
                        this.updateComponent(searchParam);
                    }
                });
            }

        });

    }

    updateComponent(searchParam: any) {
        this.value = searchParam.value;
        this.searchParam = searchParam;
        this.changeDetectionRef.markForCheck();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (this.column) {
            this.uniqueId = this.column.uniqueId;
            this.determineDescriptionType();
        }
    }

    determineDescriptionType() {
        let descTemplateHtml: string = this.column.templateModel.$searchDescriptionTemplateHtml;
        if (ObjectUtils.isNotNullAndUndefined(descTemplateHtml)) {
            this.descriptType = 'searchDescriptionTemplate';
            this.templateHtml = descTemplateHtml;
        }
        else if (this.column.templateModel.$type) {
            this.descriptType = 'customType';
            let columnType: string = this.column.templateModel.$type;
            if (columnType === 'number') {
                this.type = 'numeric-search-description';
            }
            else {
                this.type = columnType + '-search-description';
            }

        }
    }

    dynamicTemplateCallback(event) {
        this.changeDetectionRef.markForCheck();
    }

    clearComponent(event) {
        this.searchService.getClearSearchSource().next(this.searchParam);
        this.value = null;
        this.changeDetectionRef.markForCheck();
    }

    isValidValue() {
        if (typeof this.value === 'string') {
            return !ObjectUtils.isEmpty(this.value);
        }
        else if (typeof this.value === 'object') {
            return !ObjectUtils.objectIsEmpty(this.value);
        }
        return false;
    }


}
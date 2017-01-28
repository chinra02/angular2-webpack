import { FilterParamsUtil } from './../../../../../../../utils/filter-params-utils';
import { ObjectUtils } from './../../../../../../../utils/object-utils';
import { Column } from './../../../../lib/data-set/column';
import { OnChanges, Input, EventEmitter, Output, SimpleChange, Component } from '@angular/core';
import { CommaSeparatedList } from './../../../../../../../utils/comma-separated-list.pipe';

let _ = require('underscore');

@Component({
    selector: 'list-template',
    moduleId: module.id,
    templateUrl: './list-template.component.html',
    providers: [CommaSeparatedList]
})
export class ListTemplate implements OnChanges {
    @Input() type: string;
    @Input() column: Column;
    @Input() uniqueId;
    @Input() value;
    @Input() attr;
    data: Array<Object>;

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    onSearch(searchedValue) {
        let searchParams: any = { key: this.attr, value: searchedValue.value, param: '' };
        if (searchedValue.value)
            searchParams.param = FilterParamsUtil.prepareContainsParam(searchParams.key, searchedValue.value);

        this.searched.emit(searchParams);
    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['column'] && this.column && _.size(this.column.list) > 0) {
            if (typeof this.column.list[0] === 'string' || Number) {
                this.data = ObjectUtils.getArrayOfObjects(this.column.list);
            }
        }

    }
}
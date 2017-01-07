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
    @Input() uniqueid;
    @Input() value;
    data: Array<Object>;
  
    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    onSearch(searchedValue) {
        this.searched.emit(searchedValue.value);
    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['column'] && this.column && _.size(this.column.list) > 0) {
            if (typeof this.column.list[0] === 'string' || Number) {
                this.data = ObjectUtils.getArrayOfObjects(this.column.list);
            }
        }

    }
}
import { Column } from './../../../lib/data-set/column';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
    selector: 'cell-template',
    templateUrl: './cell-template.component.html'
})
export class CellTemplate implements OnChanges {
    @Input() componentType;
    @Input() cellData;
    @Input() title;
    @Input() type: string;
    @Input() column: Column;
    templateType: string;

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    onColumnSearch(searchValue) {
        this.searched.emit(searchValue);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (changes['type'] && this.type) {
            if (this.type.indexOf('-') > -1) {
                this.templateType = this.type.substring(0, this.type.indexOf('-'));
            }
            else {
                this.templateType = this.type;
            }

        }
    }


}
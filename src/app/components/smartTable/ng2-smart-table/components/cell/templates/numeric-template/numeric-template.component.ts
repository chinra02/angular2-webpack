import { FilterParamsUtil } from './../../../../../../../utils/filter-params-utils';
import { Constants } from './../../../../../../../utils/constants';
import { Subject } from 'rxjs/Rx';
import { NgSwitchDefault } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'numeric-template',
    templateUrl: './numeric-template.component.html'
})
export class NumericTemplate {
    @Input() type: string;
    @Input() title: string;
    @Input() value: string;
    @Input() uniqueId;
    @Input() attr;

    search: any;

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    debouncer: Subject<any> = new Subject<any>();

    constructor() {
        this.debouncer.debounceTime(Constants.SEARCH_DELAY_125).subscribe((searchParams) => this.searched.emit(searchParams));
    }

    onSearch(searchedValue) {
        let searchParams: any = { key: this.attr, value: searchedValue, param: '' };
        if (searchedValue)
            searchParams.param = FilterParamsUtil.prepareEqualParam(searchParams.key, searchedValue);

        this.debouncer.next(new Object(searchParams));
    }


}
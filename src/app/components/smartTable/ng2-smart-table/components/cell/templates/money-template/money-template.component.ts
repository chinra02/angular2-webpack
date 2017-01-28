import { FilterParamsUtil } from './../../../../../../../utils/filter-params-utils';
import { Constants } from '../../../../../../../utils/constants';
import { Range } from './../../../../../../../model/money-template.model';
import { CurrencyFormatPipe } from './../../../../../../../utils/currency-format.pipe';
import { ObjectUtils } from './../../../../../../../utils/object-utils';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'money-template',
    templateUrl: './money-template.component.html',
    providers: [CurrencyFormatPipe]
})
export class MoneyTemplate {
    @Input() type: string;
    @Input() title: string;
    @Input() value: Range;
    @Input() range: Range;
    @Input() uniqueId;
    @Input() attr;

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    debouncer: Subject<any> = new Subject<any>();

    constructor() {
        this.range = new Range();
        this.debouncer.debounceTime(Constants.SEARCH_DELAY_125).subscribe((money: Range) => {
            let searchParams: any = { key: this.attr, value: money, param: '' };
            this.populateParams(searchParams, money);
            this.searched.emit(searchParams);
        });
    }

    private populateParams(searchParams: any, money: Range) {
        if (money.$high)
            searchParams.param = FilterParamsUtil.prepareGreaterThanParam(this.attr, money.$high);

        if (searchParams.param && money.$low) {
            searchParams.param = searchParams.param + ',"' + FilterParamsUtil.prepareLessThanParam(this.attr, money.$low);
        }
        else if (money.$low) {
            searchParams.param = FilterParamsUtil.prepareLessThanParam(this.attr, money.$low);
        }


    }


    isHighAlone(): boolean {
        return Range.isHighAlone(this.value);
    }

    isLowAlone(): boolean {
        return Range.isLowAlone(this.value);
    }

    isHighAndLowAvailable(): boolean {
        return Range.isHighAndLowAvailable(this.value);
    }

    onSearch(event) {
        let newRange: Range = new Range(this.range.$low, this.range.$high);
        this.debouncer.next(newRange);
    }
}
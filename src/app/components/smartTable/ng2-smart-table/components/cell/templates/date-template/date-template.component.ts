import { FilterParamsUtil } from './../../../../../../../utils/filter-params-utils';
import { Constants } from '../../../../../../../utils/constants';
import { ObjectUtils } from './../../../../../../../utils/object-utils';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'date-template',
    templateUrl: './date-template.component.html'

})
export class DateTemplate implements OnChanges {
    @Input() type;
    @Input() value: any;
    @Input() title;
    @Input() uniqueId;
    @Input() attr;



    dates: { low: string, high: string } = { low: null, high: null };
    dateWithYearFirst: { low: string, high: string } = { low: null, high: null };

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['value'] && typeof this.value === 'string') {
            if (ObjectUtils.isNotNullAndUndefined(this.value))
                this.value = moment(this.value).format(Constants.DATE_FORMAT);
        }
    }

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    onDateChange(event: any, key: string) { // filter=%22claim.serviceStartDate-gt%22~%222017-01-24%22
        let searchParams: any = { key: this.attr, value: null, param: '' };
        if (key === 'afterDate') {
            if (moment(event).isValid()) {
                this.dates.high = moment(event).format(Constants.DATE_FORMAT);
                this.dateWithYearFirst.high = moment(event).format(Constants.DATE_FORMAT_YEAR);
            }
            else {
                this.dates.high = null;
                this.dateWithYearFirst.high = null;
            }
        }
        else {
            if (moment(event).isValid()) {
                this.dates.low = moment(event).format(Constants.DATE_FORMAT);
                this.dateWithYearFirst.low = moment(event).format(Constants.DATE_FORMAT_YEAR);
            }
            else {
                this.dates.low = null;
                this.dateWithYearFirst.low = null;
            }

        }
        this.populateParams(searchParams);
        this.searched.emit(searchParams);
    }

    private populateParams(searchParams: any) {
        if (this.dateWithYearFirst.high)
            searchParams.param = FilterParamsUtil.prepareGreaterThanParam(searchParams.key, this.dateWithYearFirst.high);
        if (searchParams.param && this.dateWithYearFirst.low) {
            searchParams.param = FilterParamsUtil.prepareLessThanParam(searchParams.key, this.dateWithYearFirst.low);
        }
        else if (this.dateWithYearFirst.low) {
            searchParams.param = searchParams.param + ',' + FilterParamsUtil.prepareLessThanParam(searchParams.key, this.dateWithYearFirst.low);
        }
        searchParams.value = this.dates;
    }

    isHighAlone(): boolean {
        return ObjectUtils.isNotNullAndUndefined(this.value.high) && ObjectUtils.isNullOrUndefined(this.value.low);
    }

    isLowAlone(): boolean {
        return ObjectUtils.isNotNullAndUndefined(this.value.low) && ObjectUtils.isNullOrUndefined(this.value.high);
    }

    isHighAndLowAvailable(): boolean {
        return ObjectUtils.isNotNullAndUndefined(this.value.high) && ObjectUtils.isNotNullAndUndefined(this.value.low);
    }

    getDate(date: string): Date {
        if (ObjectUtils.isNotNullAndUndefined(date))
            return moment(date, Constants.DATE_FORMAT).toDate();
        return new Date();
    }



}
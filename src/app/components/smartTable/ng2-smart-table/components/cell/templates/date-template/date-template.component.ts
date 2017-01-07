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
    @Input() id;
    @Input() title;
    @Input() uniqueid;


    dates: { low: string, high: string } = { low: null, high: null };

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['value'] && typeof this.value === 'string') {
            if (ObjectUtils.isNotNullAndUndefined(this.value))
                this.value = moment(this.value).format(Constants.DATE_FORMAT);
        }
    }

    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    onDateChange(event: any, key: string) {
        if (key === 'beforeDate') {
            this.dates.high = moment(event).format(Constants.DATE_FORMAT);
        }
        else {
            this.dates.low = moment(event).format(Constants.DATE_FORMAT);;
        }
        this.searched.emit(this.dates);
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
            return moment(date,Constants.DATE_FORMAT).toDate();
        return new Date();
    }



}
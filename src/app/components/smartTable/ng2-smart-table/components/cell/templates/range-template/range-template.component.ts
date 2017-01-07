import { Range } from './../../../../../../../model/money-template.model';
import { Subject } from 'rxjs/Rx';
import { ObjectUtils } from './../../../../../../../utils/object-utils';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'range-template',
    templateUrl: 'range-template.component.html'
})
export class RangeTemplate {
    @Input() type: string;
    @Input() title: string;
    @Input() value: Range;
    @Input() uniqueId;

    @Input() range: Range = new Range();

    debouncer: Subject<any> = new Subject<any>();

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
import { FilterParamsUtil } from './../../../../../../../utils/filter-params-utils';
import { ObjectUtils } from './../../../../../../../utils/object-utils';
import { NameTemplateModel } from '../../../../../../../model/name-template.model';
import { Constants } from './../../../../../../../utils/constants';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'name-template',
    templateUrl: './name-template.component.html',
    styleUrls: ['./name-template.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameTemplate implements OnChanges {
    @Input() type: string;
    @Input() title: string;
    @Input() value: any;
    @Input() uniqueId;
    @Input() name: NameTemplateModel;
    @Input() column;
    @Input() attr;


    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    debouncer: Subject<any> = new Subject<any>();

    constructor(private changeDetectRef: ChangeDetectorRef) {
        this.name = new NameTemplateModel();
        this.debouncer.debounceTime(Constants.SEARCH_DELAY_125).subscribe((newName: NameTemplateModel) => {
            let searchParams: any = { key: this.attr, value: newName, param: '' };
            this.populateParams(searchParams, newName);
            this.searched.emit(searchParams);
        });
    }

    private populateParams(searchParams: any, newName: NameTemplateModel) {
        let firstName = newName.$first == null ? '' : newName.$first;
        let middleName = newName.$first == null ? '' : newName.$middle;
        let lastName = newName.$first == null ? '' : newName.$last;

        if (firstName) {
            searchParams.param = FilterParamsUtil.prepareContainsParam(searchParams.key + '.first', firstName);

        }
        if (ObjectUtils.isEmpty(searchParams.param) && middleName) {
            searchParams.param = FilterParamsUtil.prepareContainsParam(searchParams.key + '.middle', middleName);

        }
        else if (middleName) {
            searchParams.param = searchParams.param + ',"' + FilterParamsUtil.prepareContainsParam(searchParams.key + '.middle', middleName);
        }
        if (ObjectUtils.isEmpty(searchParams.param) && lastName) {
            searchParams.param = FilterParamsUtil.prepareContainsParam(searchParams.key + '.last', lastName);
        }
        else if (lastName) {
            searchParams.param = searchParams.param + ',"' + FilterParamsUtil.prepareContainsParam(searchParams.key + '.last', lastName);
        }


    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['value']) {
            this.changeDetectRef.markForCheck();
        }
    }

    onSearch(event) {
        let newNameModel: NameTemplateModel = new NameTemplateModel(this.name.$first, this.name.$middle, this.name.$last);

        this.debouncer.next(newNameModel);
    }
}


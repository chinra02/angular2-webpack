import { SmartTableStorageActions } from './../../../actions/smart-table/smart-table-storage.actions';
import { EventEmitter } from '@angular/forms/src/facade/async';
import { ObjectUtils } from './../../../utils/object-utils';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
@Injectable()
export class SmartTableSearchService {

    tableSearchServiceSource: Subject<any> = new Subject<any>();
    tableClearSearchSource: Subject<any> = new Subject<any>();
    tableSearchStateSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    onSearchAsObservable(): Observable<any> {
        return this.tableSearchServiceSource.asObservable();
    }

    getSearchSource() {
        return this.tableSearchServiceSource;
    }

    getClearSearchSource() {
        return this.tableClearSearchSource;
    }

    onClearSearchAsObservable(): Observable<any> {
        return this.tableClearSearchSource.asObservable();
    }

    getSearchStateSource() {
        return this.tableSearchStateSource;
    }

    onSearchStateAsObservable(): Observable<any> {
        return this.tableSearchStateSource.asObservable();
    }

    getSearchParams(smarTableSearchParms, searchParams: Array<{ key: string, param: string, value: string | number }>): string {
        let returnValue: string = '';
        if (!ObjectUtils.isEmptyArray(searchParams)) {
            searchParams.forEach((searchParam: { key: string, param: string, value: string | number }, index: number) => {
                if (index == 0)
                    returnValue = this.getSearchString(smarTableSearchParms, searchParam);
                else
                    returnValue = returnValue + ',' + this.getSearchString(smarTableSearchParms, searchParam);

            });

        }
        return returnValue;
    }

    getSearchString(smarTableSearchParms, searchParam) {
        let matchedItem = ObjectUtils.contains(smarTableSearchParms, searchParam, 'key');
        if (matchedItem) {
            Object.assign(matchedItem, searchParam);
        }
        else if (searchParam) {
            smarTableSearchParms.push(searchParam);
        }

        return ObjectUtils.joinObjectPropertyValues(smarTableSearchParms, 'param', ',');
    }

}
import { SmartSelector } from './../components/smartTable/ng2-smart-table/components/selector/selector.component';
import { IComponentState } from './../store/index';
import { Observable, Subject } from 'rxjs/Rx';
import { NgRedux } from 'ng2-redux';
import { Injectable, NgZone } from '@angular/core';
import { ObjectUtils } from './../utils/object-utils';

export type PropertySelector = string | number | symbol;
export type PathSelector = (string | number)[];
export type Comparator = (x:any, y:any) => boolean;

@Injectable()
export class LocalStorageService {
    private storeKey:string = 'NO_KEY_SPECIFIED';
    private smartTableState:any;


    static INSTANCE;

    constructor(private ngZone:NgZone, private ngRedux:NgRedux<IComponentState>) {
        LocalStorageService.INSTANCE = this;
        this.smartTableState = this.ngRedux.getState();
    }

    updateKey(key:string) {
        if (ObjectUtils.isNotNullAndUndefined(key)) {
            this.storeKey = key;

        }

    }


    select<T>(selector:PropertySelector | PathSelector, comparator?:Comparator, returnProperty?:string):any {

        if (typeof selector === 'string' ||
            typeof selector === 'number' ||
            typeof selector === 'symbol') {

            return this.smartTableState[this.smartTableState];

        } else if (Array.isArray(selector) && this.storeKey) {
            let storeData = ObjectUtils.getIn(this.smartTableState, selector);
            if (Array.isArray(storeData)) {
                let result = storeData.filter(item=>item.tableName === this.storeKey);
                if (returnProperty) {
                    if (Array.isArray(result) && result[0]) {
                        return result[0][returnProperty]
                    }
                    else {
                        return result[returnProperty]
                    }

                }
                return result;
            }

        }

        return this.smartTableState;
    }


}




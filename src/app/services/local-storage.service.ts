import { COMPONENTS_REDUCERS } from './../store/index';
import { ObjectUtils } from './../utils/object-utils';
import { Injectable, NgZone, OnDestroy, EventEmitter } from '@angular/core';
import { Action, applyMiddleware, compose, createStore, Reducer, Store, Unsubscribe } from 'redux';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

export type PropertySelector = string | number | symbol;
export type PathSelector = (string | number)[];
export type Comparator = (x: any, y: any) => boolean;
type RetypedCompose = (func: Function, ...funcs: Function[]) => Function;


@Injectable()
export class LocalStorageService implements OnDestroy {
    private dispatch: EventEmitter<{ type: string, payload: any }> = new EventEmitter<{ type: string, payload: any }>();
    private stateSource: Subject<any> = new Subject<any>();
    private store: Store<any>;
    private storeUnSubscribe: Unsubscribe;
    private state: any;
    private _selectSource: BehaviorSubject<any>;
    private storeKey: string = 'NO_KEY_SPECIFIED';

    static INSTANCE;

    constructor(private ngZone: NgZone) {
        LocalStorageService.INSTANCE = this;
        this._selectSource = new BehaviorSubject<any>(null);
        this.stateSource.asObservable().subscribe(state => {
            this.state = state;
            if (COMPONENTS_REDUCERS && state) {
                this.storeUnSubscribe();
                this.createReduxStoreAndSaveState(COMPONENTS_REDUCERS, state);

            }

        });

        this.dispatch.subscribe((dispatchParam: { type: string, payload: any }) => {
            this.store.dispatch(this.store.dispatch(dispatchParam));
        });
    }

    /*
     This has to be called only once of the app lifecycle
    */
    createStorage(initialState: Object, rootReducers: Reducer<any>, key: string = null): void {
        if (ObjectUtils.isNotNullAndUndefined(key))
            this.storeKey = key;
        this.createReduxStoreAndSaveState(rootReducers, initialState);

    }

    private createReduxStoreAndSaveState(reducers: Reducer<any>, initialState: Object = {}) {
        this.store = createStore(reducers, initialState);
        if (ObjectUtils.isNotNullAndUndefined(this.store)) {
            this.storeUnSubscribe = this.store.subscribe(() => {
                this.state = this.store.getState();
                localStorage.setItem(this.storeKey, JSON.stringify(this.state));
            });
        }
    }

    private getStateFromLocalStorage(key: string): any {
        let storedData = JSON.parse(localStorage.getItem(key));
        return storedData;
    }

    updateKey(key: string) {
        if (ObjectUtils.isNotNullAndUndefined(key)) {
            this.storeKey = key;
            this.updateState(key);

        }

    }

    private updateState(key: string) {
        this.stateSource.next(this.getStateFromLocalStorage(key));
    }

    select<T>(selector: PropertySelector | PathSelector, comparator?: Comparator): Observable<any> {
        if (typeof selector === 'string' ||
            typeof selector === 'number' ||
            typeof selector === 'symbol') {

            this._selectSource.next(this.state[selector as PropertySelector]);

        } else if (Array.isArray(selector)) {
            let results = ObjectUtils.getIn(this.state, selector as PathSelector);
            this._selectSource.next(results);

        }
    
        return this._selectSource.asObservable().distinctUntilChanged(comparator);
    }

    makeAsyncDispatch(dispatchParam: { type: string, payload: any }): any {
        return (dispatch, state) => {
            dispatch(dispatchParam);
        }
    }


    public get $dispatch(): EventEmitter<any> {
        return this.dispatch;
    }

    ngOnDestroy(): void {
        this._selectSource.unsubscribe();
        this.stateSource.unsubscribe();
        this.$dispatch.unsubscribe();

    }



}





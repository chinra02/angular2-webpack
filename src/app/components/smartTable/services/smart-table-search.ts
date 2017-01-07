import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
@Injectable()
export class SmartTableSearchService {

    tableSearchServiceSource: Subject<any> = new Subject<any>();

    onSearchAsObservable():Observable<any>{
        return this.tableSearchServiceSource.asObservable();
    }

    getSearchSource(){
        return this.tableSearchServiceSource;
    }

}
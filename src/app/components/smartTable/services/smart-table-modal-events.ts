import { Column } from './../ng2-smart-table/lib/data-set/column';
import { Subject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
@Injectable()
export class SmartTableModalEventsService {

    private openModalSource: Subject<Column> = new Subject<any>();
    private closeModalSource: Subject<any> = new Subject<any>();

    getOpenModalSource(): Subject<Column> {
        return this.openModalSource;
    }

    getCloseModalSource(): Subject<any> {
        return this.closeModalSource;
    }

    onOpenModal(): Observable<any> {
        return this.openModalSource.asObservable();
    }

    onCloseModal(): Observable<any> {
        return this.closeModalSource.asObservable();
    }

    openModal(column: Column) {
        this.closeModalSource.next('closeAll');
        this.openModalSource.next(column);
    }

    closeModal(){
        this.closeModalSource.next('closeAll');
    }

}
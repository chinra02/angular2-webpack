import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class SmartTableActionService {
   //implements OnDestroy {

    private actionValidForSource: Subject<any> = new Subject<any>();
    private actionValidForRespSource: Subject<any> = new Subject<any>();
    private actionValidForAllSource: Subject<any> = new Subject<any>();
    private actionValidForAllRespSource: Subject<any> = new Subject<any>();

    private actionConfirmationMessageSource: Subject<any> = new Subject<any>();
    private actionConfirmationMessageRespSource: Subject<any> = new Subject<any>();
    private actionConfirmationSource: Subject<any> = new Subject<any>();


    private performedHeaderActionsSource: Subject<any> = new Subject<any>();
    private performedBulkActionsSource: Subject<any> = new Subject<any>();
    private performedRowActionSource: Subject<any> = new Subject<any>();

    private rowSelectionSource: Subject<Array<any>> = new Subject<Array<any>>();

    getActionConfirmationMessageSource(): Subject<any> {
        return this.actionConfirmationMessageSource;
    }

    onActionConfirmationMessage(): Observable<any> {
        return this.actionConfirmationMessageSource.asObservable();
    }

    getActionConfirmationMessageRespSource(): Subject<any> {
        return this.actionConfirmationMessageRespSource;
    }

    onActionConfirmationMessageResp(): Observable<any> {
        return this.actionConfirmationMessageRespSource.asObservable();
    }

    getActionConfirmationSource(): Subject<any> {
        return this.actionConfirmationSource;
    }

    onActionConfirmation(): Observable<any> {
        return this.actionConfirmationSource.asObservable();
    }

    getRowSelectionSource(): Subject<any> {
        return this.rowSelectionSource;
    }

    onRowSelection(): Observable<any> {
        return this.rowSelectionSource.asObservable();
    }

    getPerformedBulkActionSource(): Subject<any> {
        return this.performedBulkActionsSource;
    }

    onBulkActionPerform(): Observable<any> {
        return this.performedBulkActionsSource.asObservable();
    }

    getPerformedHeaderActionSource(): Subject<any> {
        return this.performedHeaderActionsSource;
    }

    onHeaderActionPerform(): Observable<any> {
        return this.performedHeaderActionsSource.asObservable();
    }

    getPerformedRowActionSource(): Subject<any> {
        return this.performedRowActionSource;
    }

    onRowActionPerform(): Observable<any> {
        return this.performedRowActionSource.asObservable();
    }

    getActionValidForSource() {
        return this.actionValidForSource;
    }

    onActionValidFor() {
        return this.actionValidForSource.asObservable();
    }

    getActionValidForRespSource() {
        return this.actionValidForRespSource;
    }

    onActionValidForResponse() {
        return this.actionValidForRespSource.asObservable();
    }

    getActionValidForAllRespSource() {
        return this.actionValidForAllRespSource;
    }

    onActionValidForAllResponse() {
        return this.actionValidForAllRespSource.asObservable();
    }

    getActionValidForAllSource() {
        return this.actionValidForAllSource;
    }

    onActionValidForAll() {
        return this.actionValidForAllSource.asObservable();
    }

   /* ngOnDestroy() {
        this.actionValidForSource.unsubscribe();
        this.actionValidForRespSource.unsubscribe();
        this.actionValidForAllSource.unsubscribe();
        this.actionValidForAllRespSource.unsubscribe();
        this.actionConfirmationMessageSource.unsubscribe();
        this.actionConfirmationMessageRespSource.unsubscribe();
        this.actionConfirmationSource.unsubscribe();
        this.performedHeaderActionsSource.unsubscribe();
        this.performedBulkActionsSource.unsubscribe();
        this.performedRowActionSource.unsubscribe();
        this.rowSelectionSource.unsubscribe();
    } */


}
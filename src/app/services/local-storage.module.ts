
import { NgRedux } from 'ng2-redux';
import { NgZone, NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import {IComponentState} from "../store/index";

export function _localStorageFactory(ngZone: NgZone, ngRedux: NgRedux<IComponentState>) {
    return new LocalStorageService(ngZone,ngRedux);
}

@NgModule({
    providers: [
        { provide: LocalStorageService, useFactory: _localStorageFactory, deps: [NgZone] }
    ]
})
export class LocalStorageModule { }


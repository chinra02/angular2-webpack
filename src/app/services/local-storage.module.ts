import { NgZone, NgModule } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export function _localStorageFactory(ngZone: NgZone) {
    return new LocalStorageService(ngZone);
}

@NgModule({
    providers: [
        { provide: LocalStorageService, useFactory: _localStorageFactory, deps: [NgZone] }
    ]
})
export class LocalStorageModule { }


import { SmartTableStorageActions } from './actions/smart-table/smart-table-storage.actions';
import { LocalStorageModule } from './services/local-storage.module';
import { INITIAL_COMPONENT_STATE, COMPONENTS_REDUCERS } from './store/index';
import { AppComponent } from './app.component';
import { SmartTableModule } from './components/smartTable/smart-table.module';
import { LocalStorageService } from './services/local-storage.service';
import { SmartTableTest } from './test/smart-table-test.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        AppComponent,
        SmartTableTest,
 
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ReactiveFormsModule,
        SmartTableModule,

    ],
    bootstrap: [AppComponent],
    providers:[LocalStorageService]

})
export class AppModule {
    constructor(private localStorage: LocalStorageService) {
         this.localStorage.createStorage(INITIAL_COMPONENT_STATE, COMPONENTS_REDUCERS);
    }
}

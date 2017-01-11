import { SmartTableTest1 } from './test/smart-table-test.component.1';
import { SmartTableStorageActions } from './actions/smart-table/smart-table-storage.actions';
import { LocalStorageModule } from './services/local-storage.module';
import { INITIAL_COMPONENT_STATE, COMPONENTS_REDUCERS, IComponentState, enhancers } from './store/index';
import { AppComponent } from './app.component';
import { SmartTableModule } from './components/smartTable/smart-table.module';
import { LocalStorageService } from './services/local-storage.service';
import { SmartTableTest } from './test/smart-table-test.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgReduxModule, NgRedux } from 'ng2-redux';
const createLogger = require('redux-logger');



@NgModule({
    declarations: [
        AppComponent,
        SmartTableTest,
        SmartTableTest1,

    ],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ReactiveFormsModule,
        SmartTableModule,
        NgReduxModule
        
       

    ],
    bootstrap: [AppComponent]


})
export class AppModule {
constructor(ngRedux: NgRedux<IComponentState>) {
    ngRedux.configureStore(COMPONENTS_REDUCERS, INITIAL_COMPONENT_STATE, [ createLogger() ],enhancers);
  }
}

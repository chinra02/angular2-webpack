import { BuildNumberService } from './build-number.service';
import { NgModule, Provider } from '@angular/core';
import { ConfigurationService } from "./configuration.service";
/**
 * Created by mikes on 11/28/2016.
 */


@NgModule({

    providers: [
        BuildNumberService,
        { provide: ConfigurationService, useClass: ConfigurationService}
    ]

})
export class ConfigurationModule {

}
import { BaseHttpService } from './../base-http.service';
import { ConfigurationModule } from './../configuration/configuration.module';
import { JwtAuthConfiguration } from './jwt-auth-configuration';
import { JwtAuthHelper } from './jwt-auth-helper';
import { JwtRestService } from './jwt-rest.service';
import { JwtTokenUrlService } from './jwt-token-url.service';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

@NgModule({
    imports: [JsonpModule, ConfigurationModule],
    providers: [
        BaseHttpService,
        JwtAuthHelper,
        JwtTokenUrlService,
        JwtAuthConfiguration,
        JwtRestService,
        AUTH_PROVIDERS
    ],
    // The store that defines our app state]
})
export class JwtAuthModule {


}


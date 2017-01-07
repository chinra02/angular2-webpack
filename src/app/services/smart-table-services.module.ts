import { TemplateLoaderService } from './template-loader.service';
import { BaseHttpService } from './base-http.service';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { SmartTableColumnService } from './smart-table-column.service';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        JwtAuthModule
    ],
    providers: [
        SmartTableColumnService, BaseHttpService, TemplateLoaderService
    ]

})
export class SmartTableServicesModule {

}
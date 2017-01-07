import { ObjectUtils } from './../utils/object-utils';
import { TemplateLoaderService } from './template-loader.service';
import { ConfigurationService } from './configuration/configuration.service';
import { BaseHttpService } from './base-http.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AsyncSubject, Observable, Subject } from 'rxjs/Rx';

let _ = require('underscore');


@Injectable()
export class SmartTableColumnService {

    constructor(private baseHttp: BaseHttpService, private configuration: ConfigurationService, private templateLoaderService: TemplateLoaderService) {

    }

    getData(jsonFileName: string): Observable<any> {
        let jsonUrl = this.configuration.getJsonUrl(jsonFileName);
        return this.baseHttp.invoke(jsonUrl);
    }

    getColumns(jsonFileName: string): Observable<any> {
        let jsonUrl = this.configuration.getJsonUrl(jsonFileName);
        let httpColumnSource: AsyncSubject<any> = new AsyncSubject<any>();
        let httpColumnSource$: Observable<String> = httpColumnSource.asObservable();
        let columns = {};
        this.baseHttp.invoke(jsonUrl).subscribe(resp => {
            this.mapColumns(resp, columns, httpColumnSource);
        },
            error => {
                this.handleError(error);
            });

        return httpColumnSource$;

    }

    mapColumns(resp: any, columns: Object, httpColumnSource: AsyncSubject<any>) {
        let definitionMap: any = JSON.parse(resp._body);
        let uniqueTemplateMap: Object = new Object();
        uniqueTemplateMap['viewTemplate'] = new Array();
        uniqueTemplateMap['EditTemplate'] = new Array();
        uniqueTemplateMap['searchTemplate'] = new Array();
        uniqueTemplateMap['searchDescriptionTemplate'] = new Array();
        let templateUrls: Object = new Object();
        definitionMap.forEach((definition) => {
            if (definition['attr']) {
                columns[definition['attr']] = definition;
                columns[definition['attr']]['id'] = definition['attr'];
                let column: Object = columns[definition['attr']];
                this.updateUniqueTemplateMap(definition.viewTemplate, 'viewTemplate', uniqueTemplateMap);
                this.updateUniqueTemplateMap(definition.editTemplate, 'editTemplate', uniqueTemplateMap);
                this.updateUniqueTemplateMap(definition.searchTemplate, 'searchTemplate', uniqueTemplateMap);
                this.updateUniqueTemplateMap(definition.searchDescriptionTemplate, 'searchDescriptionTemplate', uniqueTemplateMap);
            }
        });
        httpColumnSource.next(columns);
        this.templateLoaderService.loadTemplates(columns, uniqueTemplateMap, httpColumnSource);
    }

    private updateUniqueTemplateMap(url: string, type: string, uniqueTemplateMap: Object) {
        if (ObjectUtils.isNotNullAndUndefined(url) && this.notContains(uniqueTemplateMap[type], url)) {
            uniqueTemplateMap[type].push({ key: url, value: '' });
        }
    }

    private notContains(templateUrls: Array<string>, url: string): boolean {
        let returnValue: boolean = true;
        templateUrls.forEach((template: any) => {
            if (template.key === url) {
                returnValue = false;
                return false;
            }
        });
        return returnValue;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    static sentencify(str) {
        return str && str.replace(/([a-z])([A-Z])/g, "$1 $2");
    }



}
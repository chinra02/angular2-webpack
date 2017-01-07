import { ObjectUtils } from './../utils/object-utils';
import { BaseHttpService } from './base-http.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AsyncSubject, Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class TemplateLoaderService {

    constructor(private http: BaseHttpService) {
    }

    getTemplateContent(templatePath: string): Observable<Response> {
        return this.http.invoke(templatePath);

    }


    loadTemplates(columns: Object, uniqueTemplateMap: Object, httpColumnSource: AsyncSubject<any>) {
        let templateLoaderTracker: AsyncSubject<any> = new AsyncSubject<any>();
        templateLoaderTracker.asObservable().subscribe((templateLoader$: Observable<any>) => {
            templateLoader$.subscribe((finalResponse) => {
                this.updateColumns(columns, uniqueTemplateMap);
                httpColumnSource.complete();
            });
        });
        Object.keys(uniqueTemplateMap).forEach(templateType => {
            uniqueTemplateMap[templateType].forEach((template: any) => {
                this.loadTemplate(columns, uniqueTemplateMap, template, templateType, templateLoaderTracker);

            })

        });
        templateLoaderTracker.isEmpty().subscribe((isEmpty: boolean) => {
            if (isEmpty) {
                httpColumnSource.complete();
            }
        });
        templateLoaderTracker.complete();
    }


    private loadTemplate(columns: Object, uniqueTemplateMap: Object, template, type, templateLoaderTracker: AsyncSubject<any>) {
        let template$: Observable<any> = this.getTemplateHtml(template.key);
        templateLoaderTracker.next(template$);
        template$.subscribe((resp: any) => {
            template.value = resp;
        });
    }

    private updateColumns(columns: Object, uniqueTemplateMap: Object, ) {

        Object.keys(columns).forEach(column => {
            let columnObj = columns[column];
            if (ObjectUtils.isNotNullAndUndefined(columnObj['viewTemplate'])) {
                columnObj['viewTemplateHtml'] = this.getMatchingTemplate(uniqueTemplateMap['viewTemplate'], columnObj['viewTemplate']);
            }
            if (ObjectUtils.isNotNullAndUndefined(columnObj['EditTemplate'])) {
                columnObj['EditTemplateHtml'] = this.getMatchingTemplate(uniqueTemplateMap['EditTemplate'], columnObj['EditTemplate']);
            }
            if (ObjectUtils.isNotNullAndUndefined(columnObj['searchTemplate'])) {
                columnObj['searchTemplateHtml'] = this.getMatchingTemplate(uniqueTemplateMap['searchTemplate'], columnObj['searchTemplate']);
            }
            if (ObjectUtils.isNotNullAndUndefined(columnObj['searchDescriptionTemplate'])) {
                columnObj['searchDescriptionTemplateHtml'] = this.getMatchingTemplate(uniqueTemplateMap['searchDescriptionTemplate'], columnObj['searchDescriptionTemplate']);
            }
        })
    }

    private getMatchingTemplate(templateUrls: Array<Object>, url: string): String {
        let returnValue: string = '';
        templateUrls.forEach((template: any) => {
            if (template.key === url) {
                returnValue = template.value;
                return true;
            }
        })

        return returnValue;
    }



    private getTemplateHtml(uri: string): Observable<any> {
        let templateSource: Subject<any> = new Subject<any>();
        let template$: Observable<String> = templateSource.asObservable();
        this.getTemplateContent(uri).subscribe(
            (data: any) => {
                templateSource.next(data._body);
            },
            error => this.handleError(error)
        );

        return template$;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
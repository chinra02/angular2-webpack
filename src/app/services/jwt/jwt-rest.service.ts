import { RequestOptionsArgs } from '@angular/http';
import { JwtAuthConfiguration } from './jwt-auth-configuration';
import { Injectable } from '@angular/core';
import { RequestOptions, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import {ConfigurationService} from "../configuration/configuration.service";

let _ = require('underscore');

@Injectable()
export class JwtRestService {

    private jwtAuthConfiguration: JwtAuthConfiguration;


    constructor(private jwtConfig: JwtAuthConfiguration, private config: ConfigurationService) {
        this.jwtAuthConfiguration = jwtConfig;
    }


    invoke = function invoke(url, params=null): Observable<any> {
        let adjudicationRestSource: Subject<any> = new Subject<any>();
        let adjudicationRest$: Observable<any> = adjudicationRestSource.asObservable();

        let authHttpSource: Subject<AuthHttp> = new Subject<AuthHttp>();
        let authHttpSource$: Observable<AuthHttp> = authHttpSource.asObservable();

        authHttpSource$.subscribe(
            (authHttp: AuthHttp) => {
                let uri = this.config.baseRestUrl + url;
                let urlParams: URLSearchParams = new URLSearchParams();
                let options:RequestOptionsArgs = new RequestOptions({search: urlParams});
                if (params) {
                    _.mapObject(params, function (value, key) {
                        urlParams.set(key, value);
                    })

                }

                authHttp.request(uri, options).subscribe(resp => {
                    adjudicationRestSource.next(resp.json());
                    adjudicationRestSource.complete();
                })

            },
            (error) => {
                this.handleError(error);
            },
            () => console.log(" AdjudicationRestService invoke call is Completed !!!")
        );

        this.jwtAuthConfiguration.makeAuthHttpReady(authHttpSource);

        return adjudicationRest$;

    };

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

}
import { Injectable } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BaseHttpService {
    constructor(private jsonp: Jsonp, private http: Http) {
    }

    public invokeWithUrl = (uri, params): Observable<any> => {
        let url = uri + '?cachebuster=' + Math.random() + '&callback=JSONP_CALLBACK';
        return this.jsonp.request(url, { method: 'Get' });
    };

    public invoke = (uri): Observable<Response> => {
        return this.http.request(uri, { method: 'Get' });
    }

}
import { BaseHttpService } from './../base-http.service';
import { JwtAuthHelper } from './jwt-auth-helper';
import { JwtTokenUrlService } from './jwt-token-url.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class JwtAuthConfiguration {
    url: string;

    constructor(private http: Http,
                private baseHttp: BaseHttpService,
                private tokenUrl: JwtTokenUrlService,
                private adjJWtHelper: JwtAuthHelper) {

        this.url = this.tokenUrl.getJWTServletUrl();
    }

    makeAuthHttpReady(authHttpSource: Subject<AuthHttp>): void {

        let jwtToken = localStorage.getItem('id_token');

        if (jwtToken) this.logDelta(jwtToken);

        if (this.tokenNeedsToBeRefreshed(jwtToken)) {
            this.refreshToken(jwtToken, authHttpSource);
        } else {
            this.createAuthHttp(jwtToken, authHttpSource);
        }

    };

    private logDelta(token: string) {
        console.log("Delta: " + (new Date().valueOf() - this.adjJWtHelper.getTokenExpirationDate(token) / 1000));
    }

    private tokenNeedsToBeRefreshed(token: string) {
        return token == null || token == undefined || this.adjJWtHelper.isTokenExpired(token, 60);
    }

    private refreshToken(token: String, authHttpSource: Subject<AuthHttp>) {
        if (token) this.logToken(token);

        this.getObservableForToken().subscribe(response => this.createAuthHttp(response, authHttpSource));

        return token;
    }

    private getObservableForToken(): Observable<String> {

        let authTokenSource: Subject<String> = new Subject<String>();
        let authTokenSource$: Observable<String> = authTokenSource.asObservable();

        this.baseHttp.invokeWithUrl(this.url, null).subscribe(
            response => JwtAuthConfiguration.setToken(response, authTokenSource),
            error => console.error("Error :" + JSON.stringify(error)),
            () => console.log(" getObservableForToken is Completed !!!")
        );
        return authTokenSource$

    };

    private static setToken(response, authTokenSource: Subject<String>) {
        let token = response._body;
        localStorage.setItem('id_token', token);
        authTokenSource.next(token);
        authTokenSource.complete();
    }

    private logToken(token: String) {
        console.log("Now:     " + new Date().valueOf());
        console.log("Expires: " + this.adjJWtHelper.getTokenExpirationDate(token));
    }

    private createAuthHttp(token: String, authHttpSource: Subject<AuthHttp>) {
        let authHttp: AuthHttp = this.getNewAuthHttp(token);
        authHttpSource.next(authHttp);
        authHttpSource.complete();
    }


    private getNewAuthHttp(token): AuthHttp {
        return new AuthHttp(new AuthConfig({
            noJwtError: true,
            globalHeaders: [{'Accept': 'application/json'}],
            tokenGetter: (() => token),
        }), this.http);
    }


}
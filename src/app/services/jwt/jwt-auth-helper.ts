import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class JwtAuthHelper {

    jwtHelper: JwtHelper;

    constructor() {
        this.jwtHelper = new JwtHelper();
    }

    isTokenExpired = function isTokenExpired(token, time) {
        if (time == null || time == undefined) {
            time = 60;
        }

        return this.jwtHelper.isTokenExpired(token, time);
    };

    getTokenExpirationDate = function getTokenExpirationDate(token) {
        return this.jwtHelper.getTokenExpirationDate(token).valueOf()
    }


}
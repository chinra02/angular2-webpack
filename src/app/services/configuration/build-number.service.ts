import { Injectable } from '@angular/core';
/**
 * This service returns the build number of the project for use in urls.
 *
 * Created by mikes on 11/28/2016.
 */

@Injectable()
export class BuildNumberService {

    private buildNumber: string;

    constructor() {
        this.buildNumber = window['buildNumber'] || window.top['buildNumber'] || Math.random();
    }

    get(): string {
        return this.buildNumber;
    };

    getUrlString(): string {
        return "?buildNumber=" + this.buildNumber;
    };

}
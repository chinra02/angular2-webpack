import { ConfigurationService } from './../configuration/configuration.service';
import { Injectable } from '@angular/core';
// created by Raghavendra Chinam


@Injectable()
export class JwtTokenUrlService {

    constructor(private config: ConfigurationService) {}

    getJWTServletUrl = function getJWTServletUrl() {
        // Prefer baseAppUrl if we are in an IFrame.

        if (window.top && window.top['baseAppUrl']) {
            return window.top.top['baseAppUrl'] + "/jwt";
        } else {
            // Fall back to the configured URL on the
            return this.config.jwtBaseUrl + "/jwt";
        }
    }

}
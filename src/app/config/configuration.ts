import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    private jsonBaseUrl = '/app/json/' ;

    getJsonUrl = function getJsonUrl(jsonurl: string, buildNumberUrl: string): string{
      return jsonurl + buildNumberUrl;
    };
}

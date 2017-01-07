import { BuildNumberService } from './build-number.service';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class ConfigurationService {
    public baseJsonUrl:string = '/app/data/json/';
    public baseRestUrl: string = "/adjudication_service/rest/api/v1/";
    private buildNumberService: BuildNumberService;
    //public baseAdjudicationUrl: string = this.baseRestUrl + "adjudication/";
    // private jsonBaseUrl = "http://localhost:8080/truchart_qtrnk_web/adjudication/adjudication_data/json/";
    // private jsonBaseUrl = "/truchart_qtrnk_web/adjudication/adjudication_data/json/";
    // public baseUrl: string= "http://localhost:8080/adjudication_service/rest/api/v1/";
    // public jwtBaseUrl:string = "http://localhost:8080/truchart_qtrnk_web";
    //= "http://localhost:8080/adjudication_service/rest/";
    // public ApiUrl: string = "api/";
    // public ServerWithApiUrl = this.Server + this.ApiUrl;

    
    constructor(private injector: Injector) {
        this.buildNumberService = injector.get(BuildNumberService);
     }

    getJsonUrl(jsonFileName: string): string {
        return this.baseJsonUrl + jsonFileName + '.json' + this.buildNumberService.getUrlString();
    }


}

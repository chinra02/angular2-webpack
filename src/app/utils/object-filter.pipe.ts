import {Pipe} from '@angular/core';

@Pipe({name: 'objectFilter'})
export class ObjectFilter {

    transform(obj: any, filter: any): any {
         if (obj!=null && obj!=undefined && obj.hasOwnProperty(filter)) {
             return obj[filter];
         }
        else {
             return [];
         }

    }
}
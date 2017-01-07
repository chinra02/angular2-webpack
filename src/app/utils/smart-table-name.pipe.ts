import { ObjectUtils } from './object-utils';
import { Pipe, PipeTransform } from '@angular/core';
let _:any = require('underscore');

@Pipe({name: 'SmartTableName'})
export class SmartTableName implements PipeTransform {
    transform(name, args:string[]):any {
        name = name || {};
        function trim(str) {
            return str && str.trim && str.trim() || str;
        }

        let firstMiddle = [name.first, name.middle].map(trim).filter(_.identity).join(' ');
        return [name.last, firstMiddle, name.suffix].map(trim).filter(_.identity).join(', ');

    }
}

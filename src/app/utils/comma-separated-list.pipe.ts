import {Pipe, PipeTransform} from '@angular/core';
import { ObjectUtils } from "./object-utils";

@Pipe({name: 'commaSeparatedList'})
export class CommaSeparatedList implements PipeTransform {
    transform(list, args:string[]):any {
        if (ObjectUtils.isNotNullAndUndefined(list) && typeof list === 'Array') {
            return list.join(", ");
        }
        return list;
    }
}
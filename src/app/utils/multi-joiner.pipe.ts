var _ = require('underscore');
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'MultiJoiner'})
export class MultiJoiner implements PipeTransform {
  transform(elem, args: string[]): any {
                 if (!elem) return null;
            let pairs = [
                [elem.statusCategoryCode1, elem.statusCode1],
                [elem.statusCategoryCode2, elem.statusCode2],
                [elem.statusCategoryCode3, elem.statusCode3]
            ];
            // _.partial(_.every, _, angular.identity);
            let hasData = function (pair) {
                return _.some(pair);
            }; 

            let joinpair = function (pair) {
                return _.filter(pair).join('-');
            };

            let codes = _.chain(pairs)
                .filter(hasData)
                .map(joinpair)
                .join('/')
                .value();

            return [codes, elem.freeFormMessageText].join(' - ');
  }
}
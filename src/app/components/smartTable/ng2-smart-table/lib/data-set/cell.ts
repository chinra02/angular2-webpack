import { ObjectUtils } from './../../../../../utils/object-utils';
import { Column } from './column';
import { DataSet } from './data-set';
import { Row } from './row';
let _ = require('underscore');
export class Cell {

    newValue = '';
    isVisible:boolean = true;
    parsedValue:string = ' ';
    isPopover:boolean = false;
    type:string = "";
    protected static PREPARE = (value:any) => value;

    constructor(protected value:any, protected row:Row, protected column:Column, protected dataSet:DataSet, isPopOver:boolean) {
        this.newValue = value;
        this.isPopover = isPopOver;
        this.type = column.templateModel.$type;
    }

    getData():any {
        return this.value;
    }

    getValue():any {
        let valid = this.column.getValuePrepareFunction() instanceof Function;
        let prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
        let parseValue:string;
        if (_.isArray(this.value)) {
            if (this.value.length > 0) {
                let lengthStr = this.value.length;
                this.parsedValue = lengthStr + (this.value.length > 1 ? ' mesages' : ' message');
            }
            return prepare.call(null, this.parsedValue);
        }
        return prepare.call(null, this.value);
    }

    getColumn():Column {
        return this.column;
    }

    getRow():Row {
        return this.row;
    }

    getViewTemplate() {
        return this.column.templateModel.$viewTemplateHtml;
    }

    hasType():boolean {
        return !!ObjectUtils.isNotNullAndUndefined(this.type);
    }
}

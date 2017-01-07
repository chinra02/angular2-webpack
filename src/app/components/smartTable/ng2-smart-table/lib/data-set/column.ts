import { TemplateLoaderService } from '../../../../../services/template-loader.service';
import { Observable } from 'rxjs/Rx';
import { ObjectUtils } from './../../../../../utils/object-utils';
import { ColumnTemplateModel } from './../../../../../model/templates/column-template.model';
import { DataSet } from './data-set';

export class Column {

    public attr:string = '';
    public title:string = '';
    public templateModel:ColumnTemplateModel = new ColumnTemplateModel();
    public class:string = '';
    public list:Array<any> = [];
    public isSortable:boolean = true;
    public isEditable:boolean = true;
    public isFilterable:boolean = false;
    public isVisible:boolean = true;
    public sortDirection:string = '';
    public defaultSortDirection:string = '';
    public uniqueId:string;
    protected compareFunction:Function;
    protected valuePrepareFunction:Function;
    protected filterFunction:Function;

    constructor(public id:string, protected settings:any, protected dataSet:DataSet, uniqueTemplateMap:Object) {
        if (this.settings) {
            this.applySettings();
        }
    }

    public getCompareFunction():Function {
        return this.compareFunction;
    }

    public getValuePrepareFunction():Function {
        return this.valuePrepareFunction;
    }

    public getFilterFunction():Function {
        return this.filterFunction;
    }

    protected applySettings():void {

        this.attr = this.settings['attr'];
        this.title = this.settings['title'];
        this.class = this.settings['class'];
        this.templateModel.$type = this.settings['type'];
        this.templateModel.$viewTemplate = this.settings['viewTemplate'];
        this.templateModel.$searchTemplate = this.settings['searchTemplate'];
        this.templateModel.$editTemplate = this.settings['editTemplate'];
        this.templateModel.$searchDescriptionTemplate = this.settings['searchDescriptionTemplate'];

        this.templateModel.$viewTemplateHtml = this.settings['viewTemplateHtml'];
        this.templateModel.$searchTemplateHtml = this.settings['searchTemplateHtml'];
        this.templateModel.$editTemplateHtml = this.settings['editTemplateHtml'];
        this.templateModel.$searchDescriptionTemplateHtml = this.settings['searchDescriptionTemplateHtml'];

        this.isFilterable = typeof this.settings['filter'] === 'undefined' ? true : !!this.settings['filter'];
        this.defaultSortDirection = ['st-multi-sort-ascent', 'st-multi-sort-descent'].indexOf(this.settings['sortDirection']) !== -1 ? this.settings['sortDirection'] : '';
        this.isSortable = (this.settings['sort'] === undefined || this.settings['sort'] === null) ? true : !!this.settings['sort'];
        this.isEditable = typeof this.settings['editable'] === 'undefined' ? true : !!this.settings['editable'];
        this.sortDirection = this.settings['sort'] === 'st-multi-sort-descent' ? 'st-multi-sort-descent' : 'st-multi-sort-ascent';

        this.compareFunction = this.settings['compareFunction'];
        this.valuePrepareFunction = this.settings['valuePrepareFunction'];
        this.filterFunction = this.settings['filterFunction'];
        this.isVisible = (this.settings['visible'] === undefined || this.settings['visible'] === null) ? true : this.settings['visible'];
        this.uniqueId = this.settings['uniqueId'] === 'undefined' ? this.title : this.settings['uniqueId'];
        this.list = this.settings['list'] === 'undefined' ? null : this.settings['list'];

    }


}


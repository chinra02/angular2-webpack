import { SmartTableActionService } from './../../services/smart-table-actions.service';
import { ObjectUtils } from './../../utils/object-utils';
import { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
let _ = require('underscore');
@Component({
    selector: 'ng2-dropdown-comp',
    templateUrl: 'ng2-dropdown.component.html',
    styleUrls: ['ng2dropdown.css']
   })
export class Ng2DropDownComponent implements OnInit {
    // implements OnChanges{

    @Input() public label:string;
    @Output() public selected:EventEmitter<any> = new EventEmitter<any>();
    @Input() optionsDisplayProperty:string = 'label';
    @Input() optionsVisibility:boolean;
    @Input() isSmartSelectorEnabled:boolean = true;
    @Input() dropdownNotCloseZone = null;
    @Input() displayLength:boolean = true;
    @Input() public data:Array<any>; // Excepting [{visible:true,title:'Sample'}]
    @Input() displayRowSelections:boolean = false;
    @Input() toolTip:string;
    @Input() rowSelections:Array<any> = new Array<any>();

    @Output() public edited:EventEmitter<any> = new EventEmitter<any>();

    displayValue:string;

    constructor(private actionService:SmartTableActionService) {
    }

    ngOnInit() {
        this.actionService.onRowSelection().subscribe((rows:Array<any>) => {
            this.rowSelections = rows;
        })
    }

    /*
     ngOnChanges(changes:{[propertyName:string]:SimpleChange}):void{
     if(changes['data'] && this.data && _.size(this.data)>0 ){
     if(typeof this.data[0] === 'string' || Number){
     this.data = this.getArrayOfObjects(this.data);
     }
     }

     } */

    getArryOfObjects(data:Array<string>):Array<Object> {
        let listOfObjects = new Array<Object>();
        data.forEach(item => {
            let obj:Object = new Object();
            obj['id'] = item;
            obj['label'] = item;
            listOfObjects.push(obj);
        });
        return listOfObjects;

    }

    getToolTip = function getToolTip():string {
        if (this.data.length === 1) {
            return this.data[0][this.optionsDisplayProperty];
        }
        return this.label;
    };

    onChange = function onChange(event, option):void {
        event.selectedOption = option;
        this.edited.emit(event);
    };

    onSelect = function onSelect(event, option) {
        if (ObjectUtils.isNullOrUndefined(this.label)) {
            this.displayValue = option.label;
        }
        event.selectedOption = option;
        event.selectedRows = this.rowSelections;
        this.selected.emit(event, this.optionsDisplayProperty);
    };

    onBtnClick = function onBtnClick(event, option) {
        if (this.data.length === 1)
            this.onSelect(event, option);
        else
            event.stopPropagation();

    };

}

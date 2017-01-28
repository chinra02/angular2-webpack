import { TemplateLoaderService } from '../../../../../services/template-loader.service';
import { ObjectUtils } from './../../../../../utils/object-utils';
import { Cell } from './../../lib/data-set/cell';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange
} from '@angular/core';


@Component({
    selector: 'ng2-smart-table-cell',
    moduleId: module.id,
    styleUrls: ['cell.css'],
    templateUrl: './cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class CellComponent implements OnChanges {

    @Input() cell:Cell;
    @Input() inputClass:string = '';
    @Input() mode:string = 'inline';
    @Input() type:string;
    cellType:string = 'text';
    value:any;
    templateHtml:string;
    context:any = {};

    constructor(private changeDetectRef:ChangeDetectorRef) {
    }

    @Output() public edited:EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(changes:{ [propertyName: string]: SimpleChange }):void {

        if (changes['cell']) {
            this.value = this.cell.getValue();
            this.determineCellType();
            if (ObjectUtils.isNotNullAndUndefined(this.cell.type))
                this.type = this.cell.type + '-view';

        }
        this.changeDetectRef.markForCheck();
    }


    onStopEditing():boolean {
        return false;
    }

    onEdited(event:any):boolean {
        this.edited.emit(event);
        return false;
    }

    onClick(event:any):void {
        event.stopPropagation();
    }

    determineCellType() {
        let viewTemplateUrl = this.cell.getViewTemplate();
        if (this.cell.isPopover) {
            this.cellType = 'popOver';
        }
        else if (ObjectUtils.isNotNullAndUndefined(viewTemplateUrl)) {
            this.cellType = 'viewTemplate';
            this.templateHtml = this.cell.getViewTemplate();
            this.context = {contextValue: this.value};
        }
        else if (ObjectUtils.isNotNullAndUndefined(this.cell.type)) {
            this.cellType = 'customType';
        }
        else {
            this.cellType = 'text';
        }

    }

    dynamicTemplateCallback(event) {
        this.changeDetectRef.markForCheck();

    }

}

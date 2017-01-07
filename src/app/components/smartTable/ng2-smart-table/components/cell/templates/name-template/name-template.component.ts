import { NameTemplateModel } from '../../../../../../../model/name-template.model';
import { Constants } from './../../../../../../../utils/constants';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'name-template',
    templateUrl: './name-template.component.html',
    styleUrls: ['./name-template.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameTemplate implements OnChanges{
    @Input() type: string;
    @Input() title: string;
    @Input() value: any;
    @Input() uniqueId;
    @Input() name: NameTemplateModel ;
    @Input() column;


    @Output() searched: EventEmitter<any> = new EventEmitter<any>();

    debouncer: Subject<any> = new Subject<any>();

    constructor(private changeDetectRef: ChangeDetectorRef) {
        this.name = new NameTemplateModel();
        this.debouncer.debounceTime(Constants.SEARCH_DELAY_125).subscribe((newName: NameTemplate) => this.searched.emit(newName));
    }

    ngOnChanges(changes:{[propertyName: string]:SimpleChange}){
        if(changes['value']){
           this.changeDetectRef.markForCheck();
        }
    }

    onSearch(event) {
         let newNameModel:NameTemplateModel = new NameTemplateModel(this.name.$first,this.name.$middle,this.name.$last);
         this.debouncer.next(newNameModel);
    }
}


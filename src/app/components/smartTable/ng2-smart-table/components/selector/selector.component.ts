import { Grid } from '../../lib/grid';
import { Row } from '../../lib/data-set/row';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'smart-selector',
    template: `
    <input type="checkbox" *ngIf="isSelectorEnabled"
      [ngClass]="inputClass"
      [(ngModel)]="selectedValue"
      [placeholder]="placeHolder"
      [disabled]="disabled"
      (change)="onChange($event)">
    `
})
export class SmartSelector {
    @Input() selectionType: string;
    @Input() grid: Grid;
    @Input() placeHolder: string = "Select";
    @Input() selectedValue;
    @Output() public edited: EventEmitter<any> = new EventEmitter<any>();
    isSelectorEnabled: boolean = true;
    disabled: boolean = false;
    selectorType: String;


    private onChange(event): void {
        this.selectedValue = event.target.checked;
        this.edited.emit(this);

    }



}
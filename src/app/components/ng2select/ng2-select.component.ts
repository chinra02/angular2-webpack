import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/forms/src/facade/async';

/**
 * This is a basic select that can take a custom key/value pair.
 *
 * Usage:
 *
 * <ng2-select  message="-- Choose An Option --"        // If set, will display a default option that returns a value of "".
 *              key="keyAttr"                           // The attribute to display in the dropdown (e.g. in this case item.keyAttr)
 *              value="valueAttr"                       // OPTIONAL. Can return a specific attribute rather than entire object (item.valueAttr)
 *              [options]="optionsArray"                // An array of objects to select.
 *              (selectChanged)="yourMethod($event)">   // The emitted event "selectChanged" that carries the value selected to send into your method.
 * </ng2-select>
 *
 * Created by mikes on 1/5/2017.
 */
@Component({
    selector: 'ng2-select',
    template: `
<select [(ngModel)]="selectedOption" (ngModelChange)="onSelectChange($event)">
    <option value="" *ngIf="message && message.length > 0">{{message}}</option>
    <option *ngFor="let option of options" [ngValue]="value ? option[value] : option">{{option[key]}}</option>
</select>
`
})
export class Ng2Select {
    @Input() options: Array<any>;
    @Input() message: string;
    @Input() key: string = "key";
    @Input() value: string;
    @Output() selectChanged: EventEmitter<any> = new EventEmitter<any>();

    selectedOption: Object;

    onSelectChange(event) {
        this.selectChanged.emit(event);
    }

}
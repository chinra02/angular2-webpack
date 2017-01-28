import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * This is a basic radio-group that can take a custom key/value pair.
 *
 * Usage:
 *
 * <ng2-radio-group  name="your_radio_group"                          // Uniquely identifies members of the radio group.
 *                   title="Title"                                  // If set, will display a default option that returns a value of "".
 *                   key="keyAttr"                                  // The attribute to display in the dropdown (e.g. in this case item.keyAttr)
 *                   [options]="optionsArray"                       // An array of objects to select.
 *                   (radioButtonSelected)="yourMethod($event)">    // The emitted event "radioButtonSelected" that carries the value selected to send into your method.
 * </ng2-radio-group>
 *
 * Created by mikes on 1/19/2017.
 */
@Component({
    selector: 'ng2-radio-group',
    template: `
<div>
    <label *ngIf="title" class="ng2-radio-button-title">{{title}}</label>
    <div *ngFor="let option of options">
        <label class='ng2-radio-button-label'>
        <input  type="radio" 
                class="ng2-radio-button-input"
                [name]="name" 
                [(ngModel)]='selectedRadioButton' 
                [value]="option.value" 
                (ngModelChange)="onRadioButtonChange($event)">{{option[key]}}
        </label>
    </div>
</div>
`,
    styleUrls: ['ng2radiogroup.css']
})

export class Ng2RadioGroupComponent {

    @Input() name: string = "name";
    @Input() title: string;
    @Input() key: string = "key";
    @Input() options: Array<any>;
    @Output() radioButtonSelected: EventEmitter<any> = new EventEmitter<any>();

    public selectedRadioButton: Object;

    onRadioButtonChange(event) {
        let returnValue:any = this.options.find(option=>option.value==event);
        this.radioButtonSelected.emit(returnValue);
    }

}
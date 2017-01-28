import { Constants } from './../../utils/constants';
import { ObjectUtils } from './../../utils/object-utils';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/forms/src/facade/async';
import * as moment_ from 'moment';

const moment: any = (<any>moment_).default || moment_;



@Component({
  selector: 'ng2-datepicker',
  moduleId: module.id,
  templateUrl: 'ng2-datepicker.component.html',

})
export class DatePickerComponent {
  @Input() opened: boolean = false;
  @Input() format: string = 'shortDate';
  @Input() id;
  @Input() placeHolder;
  @Output() dateChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() dt: Date;
  inputDate: Date;


  public constructor() {
    if (this.dt == null || this.dt == undefined) {
      this.dt =  moment(new Date(), Constants.DATE_FORMAT).toDate();
    }
  }

  public today(): void {
    this.dt = moment(new Date(), Constants.DATE_FORMAT).toDate();
    this.inputDate = this.dt;
  }


  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  public open(): void {
    this.opened = !this.opened;
  }

  public clear(): void {
    this.dt = void 0;
    this.inputDate=null;
  }


  public toggle() {
    this.opened = !this.opened;
  }

  public onDateChange(event) {
    if (event.target.value) {

      let newDate: any = moment(event.target.value, Constants.DATE_FORMAT).toDate();
      if (newDate && newDate != 'Invalid Date') {
        this.dt = newDate;
        this.inputDate=newDate;
        this.dateChanged.emit(this.dt);
      }
    }
    else {
      this.dateChanged.emit(null);
    }
  }

  public onDateSelection(date: string) {
    if (ObjectUtils.isNotNullAndUndefined(date)) {
      let newDate: any = moment(date, Constants.DATE_FORMAT).toDate();
      if (newDate && newDate != 'Invalid Date') {
        this.inputDate=newDate;
        this.dateChanged.emit(newDate);
      }
    }
  }

}

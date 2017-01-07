import {Component,Input} from '@angular/core';

@Component({
   selector: 'messages-template',
   templateUrl: './messages-template.component.html'
   
})
export class MessagesTemplate{
    @Input() type;  
    @Input() messages:Array<any>;
    @Input() title:string;
    @Input() value;
}
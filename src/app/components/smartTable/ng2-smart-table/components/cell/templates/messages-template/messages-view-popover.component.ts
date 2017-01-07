import { Component, Input } from '@angular/core';

@Component({
    selector: 'messages-view-template',
    template: `
    <ul class="claim-message-popover">
    <li *ngFor="let message of messages">
        {{message.countMessage}}{{ message | MultiJoiner }}
    </li>
</ul>
   `,
   styleUrls:['./messages-template.css']
})
export class MessagesPopOver {
    @Input() columnDate;
    @Input() uniqueid;
    @Input() messages;
    @Input() column;
}
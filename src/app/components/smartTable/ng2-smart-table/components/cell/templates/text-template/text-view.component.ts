import { Component, Input, ViewChild } from '@angular/core';
@Component({
    selector: 'text-view',
    template: `
        <div class="st-cell-view"><span>{{ value }}</span> </div>
    `,
    styleUrls: ['./text-view.css']
})
export class TextViewComponent {
    @Input() value: any;
}
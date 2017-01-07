import { Component, Input } from '@angular/core';

@Component({
    selector: 'search-description-template',
    template: ` 
    <div>[{{value}}]</div>
   `
})
export class SearchDescriptionTemplate {
    @Input() value;

}
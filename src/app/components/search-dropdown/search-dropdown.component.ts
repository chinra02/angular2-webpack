import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'search-dropdown',
    templateUrl: './search-dropdown.component.html',

})
export class SearchDropdownComponent {

    @Input() optionsDisplayProperty:string = 'label';
    @Input() public data:Array<any> = new Array<any>();

    @Output() searched:EventEmitter<any> = new EventEmitter<any>();

    onSelected(selectedOption:any) {
        this.searched.emit(selectedOption);
    }

}
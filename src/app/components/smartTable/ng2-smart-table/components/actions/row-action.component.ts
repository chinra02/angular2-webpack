import { Component } from '@angular/core';

@Component({
   selector: 'row-action',
   template: `
    <div class="row-action">
          <ng-content></ng-content>
    </div>
     
   `
})
export class RowAction {

}
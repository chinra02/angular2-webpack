import { Component } from '@angular/core';

@Component({
   selector: 'header-actions',
   template: `
    <div class="header-actions" style="margin-right:8px;margin-top: -3px;">
      <ng-content></ng-content>
    </div>
     
   `
})
export class HeaderActions {

}
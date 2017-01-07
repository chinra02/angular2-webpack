import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { DataSource } from '../../lib/data-source/data-source';
import { Column } from '../../lib/data-set/column';

@Component({
  selector: 'ng2-smart-table-filter',
  moduleId:module.id,
  template: `
    <div class="ng2-smart-filter" *ngIf="column.isFilterable">
      <input 
      [(ngModel)]="query"
      (keyup)="filter($event)"
      [ngClass]="inputClass"
      class="form-control"
      type="text" 
      placeholder="{{ column.title }}" />
    </div>
  `
})
export class FilterComponent {

  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass: string = '';

  query: string = '';
  timeout: any;
  delay: number = 300;

  ngAfterViewInit(): void {
    this.source.onChanged().subscribe((elements) => {
      let filterConf = this.source.getFilter();
      if (filterConf && filterConf.filters && filterConf.filters.length === 0) {
        this.query = '';
      }
    });
  }

}

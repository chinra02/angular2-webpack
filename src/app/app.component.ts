import { SmartTableColumnService } from './services/smart-table-column.service';
import { Component, NgZone, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){
      this.setLocalData();
  }

    isFirst: boolean = true;
    data:any;
    secondData: any;

    onRowClick(event) {
        this.columnService.getData('entry_eclaim_data').subscribe((resp) => {
            this.secondData = JSON.parse(resp._body);
            this.isFirst == false ? this.isFirst = true : this.isFirst = false;

        });
        
    }

    constructor(private columnService: SmartTableColumnService) {}


    private setLocalData() {
        this.columnService.getData('entry_eclaim_data').subscribe((resp) => {
            this.data = JSON.parse(resp._body);
        });
    }

}

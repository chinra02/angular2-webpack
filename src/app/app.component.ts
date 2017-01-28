import {
    ActionValidationParams,
    BaseActionParams,
    BulkActionParams,
    HeaderActionParams,
    RowActionParams
} from './model/actions/smart-table-action-params.model';
import { SmartTableDetailActionModel } from './model/actions/smart-table-detail-action.model';
import { SmartTableActionModel, HeaderActionModel, BulkActionModel, RowActionModel } from './model/actions/smart-table-action.model';
import { SmartTableColumnService } from './services/smart-table-column.service';
import { Component, NgZone, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        this.setLocalData();
    }
    isFirst: boolean = true;
    data: any;
    secondData: any;
    actionModel: any;

    onRowClick(event) {
        this.isFirst == false ? this.isFirst = true : this.isFirst = false;
        this.secondData = new Array().concat(this.data.filter((item, index) => index > 400));
        this.actionModel.$rowActionModel.$actions.forEach((action: SmartTableDetailActionModel) => action.$isEnabled = true);
        this.actionModel.$rowActionModel.$actions.forEach((action: SmartTableDetailActionModel) => {
            if (action.$id === 'edit_paper_claim')
                action.$isEnabled = true;
            if (action.$id === 'export')
                action.$isEnabled = false;

        });
        //this.actionModel = this.actionModel;
    }

    constructor(private columnService: SmartTableColumnService) {
        this.handleActions();
    }


    private setLocalData() {
        this.columnService.getData('entry_eclaim_data').subscribe((resp) => {
            this.data = JSON.parse(resp._body);
        });
    }

    handleActions() {

        this.actionModel = new SmartTableActionModel();

        let headerActionModel: HeaderActionModel = new HeaderActionModel();
        let smartTableDetailActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        smartTableDetailActionModel.$id = 'export';
        smartTableDetailActionModel.$name = 'Export All';
        smartTableDetailActionModel.$isEnabled = true;
        let deleteClaimActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        deleteClaimActionModel.$id = 'deleteClaim';
        deleteClaimActionModel.$name = 'Delete Claim';
        headerActionModel.$actions = [smartTableDetailActionModel, deleteClaimActionModel];
        headerActionModel.$label = 'New Claims';
        headerActionModel.$isActionValidForRequired = false;
        this.actionModel.$headerActionModel = headerActionModel;


        let bulkActionModel: BulkActionModel = new BulkActionModel();
        let smartTablePaperClaimDetailActionModel: SmartTableDetailActionModel = new SmartTableDetailActionModel();
        smartTablePaperClaimDetailActionModel.$id = 'edit_paper_claim';
        smartTablePaperClaimDetailActionModel.$name = 'Edit Paper Claim';
        smartTablePaperClaimDetailActionModel.$isEnabled = false;
        bulkActionModel.$actions = [smartTablePaperClaimDetailActionModel, smartTableDetailActionModel];
        bulkActionModel.$label = 'Claim';
        bulkActionModel.$isActionValidForRequired = false;
        this.actionModel.$bulkActionModel = bulkActionModel;

        let rowActionModel: RowActionModel = new RowActionModel();
        rowActionModel.$actions = [smartTablePaperClaimDetailActionModel, smartTableDetailActionModel];
        rowActionModel.$isActionValidForRequired = false;
        this.actionModel.$rowActionModel = rowActionModel;

    }


}

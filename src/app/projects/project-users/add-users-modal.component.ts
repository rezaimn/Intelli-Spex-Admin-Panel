import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { EventsService } from 'src/app/shared/services/events-service';

@Component({
  template: `
        <ngx-datatable
          #memberTable
          class="material striped"
          [rows]="model"
          [columnMode]="'flex'"
          [headerHeight]="60"
          [messages]="{emptyMessage: 'No Data', totalMessage: 'Total'}"
          style="width: 30%"
          [footerHeight]="45"
          [rowHeight]="50"
          [loadingIndicator]="isLoading"
          [externalPaging]="true"
          [count]="count"
          [offset]="offset"
          [limit]="limit"
          (page)='getProjectEvents($event)'>
            <ngx-datatable-column [resizeable]="false" prop="name" name="User" [flexGrow]="3">
            </ngx-datatable-column>
            <ngx-datatable-column [resizeable]="false" [flexGrow]="1">
              <ng-template let-value="value" let-row="row" ngx-datatable-cell-template let-rowIndex="rowIndex">
                <button mat-raised-button style="padding: 0 45px;margin-left: 1rem;margin-right: 1rem" color="primary"
                  (click)="addEevent(row, rowIndex)">
                  Add
                </button>
              </ng-template>
            </ngx-datatable-column>
        </ngx-datatable>`
})
export class AddUsersModalComponent implements OnInit {
  model = [];
  id: number;
  isLoading = false;
  count = 0;
  offset = 0;
  limit = 20;
  term = ' ';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: EventsService,
    private messageBox: MessageBoxComponent
    ) {
  }
  ngOnInit() {
    this.getProjectEvents(this.offset);
  }
  getProjectEvents(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getEventList(offset + 1).subscribe(result => {
      this.isLoading = false;
      if (result.status === 200) {
        this.count = result.result.total;
        this.offset = result.result.page - 1;
        this.limit = result.result.perPage;
        this.model = result.result.data;
      } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  addEevent(){

  }
  deleteBtn(row, rowIndex) {
        // this.service.deleteProject(row.id).subscribe(resultData => {
        //   if (resultData.status === 200) {
        //     this.model.splice(rowIndex, 1);
        //     this.model = [...this.model];
        //     this.messageBox.showSuccess(null, 'Delete Succeeded!');
        //   } else {
        //     this.messageBox.showError(null, 'Operation failed!');
        //   }
        // });
      }
}

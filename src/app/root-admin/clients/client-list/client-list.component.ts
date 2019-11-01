import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../../shared/messageBox';
import { DeleteDataDialogComponent } from '../../../core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {ClientService} from '../../../shared/services/client-service';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  model = [];
  @ViewChild('searchClients') searchReference: ElementRef;
  searchBox = '';
  isLoading = false;
  count = 0;
  offset = 0;
  limit = 10;
  term = ' ';
  dialogRefDeleteData: MatDialogRef<any> | null;
  deleteConfig = {
    disableClose: false,
    data: {
      title: 'Delete Project',
      subtitle: 'Are you sure to delete this Client?',
    },
    hasBackdrop: true,
    backdropClass: '',
    width: '30%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
  } as MatDialogConfig<any>;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: ClientService,
    private messageBox: MessageBoxComponent) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
   this.getClientList(this.offset);
    // Observable.fromEvent(this.searchReference.nativeElement, 'keyup')
    // // get value
    //     .map((evt: any) => evt.target.value)
    //     // text length must be > 2 chars
    //     //.filter(res => res.length > 2)
    //     // emit after 1s of silence
    //     .debounceTime(500)
    //     // emit only if data changes since the last emit
    //     .distinctUntilChanged()
    //     // subscription
    //     .subscribe((text: string) => this.searchClients(text));
  }
  getClientList(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getClientList(offset + 1).subscribe(result => {
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

  deleteClient(row, rowIndex) {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteClient(row.id).subscribe(resultData => {
          if (resultData.status === 200) {
            this.model.splice(rowIndex, 1);
            this.model = [...this.model];
            this.messageBox.showSuccess(null, 'Delete Succeeded!');
          } else {
            this.messageBox.showError(null, 'Operation failed!');
          }
        });
      }
    });
  }
  changeClientStatus(client) {
    this.service.changeClientStatus(client.id).subscribe((result) => {
      if (result.status === 200) {
        this.getClientList(this.offset);
        this.messageBox.showSuccess(null, 'Change Status Succeeded!');
      } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  searchClients(search) {
    // this.searchBox = search;
    // if (search.length > 0) {
    //   this.service.searchProject(search).subscribe(
    //       (result) => {
    //         if (result.status === 200) {
    //           this.count = result.result.length;
    //           this.offset = 0;
    //           this.limit = result.result.length;
    //           this.model = result.result;
    //         }
    //       }
    //   );
    // } else {
    //   this.getProjectList();
    // }
  }
}

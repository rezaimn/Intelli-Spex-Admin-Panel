import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { UsersService } from '../../shared/services/users-service';
import { DeleteDataDialogComponent } from '../../core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('searchUsers') searchReference: ElementRef;
  searchBox = '';
  model = [];
  isLoading = true;
  count = 0;
  offset = 0;
  limit = 10;
  term = ' ';
  dialogRefDeleteData: MatDialogRef<any> | null;
  deleteConfig = {
    disableClose: false,
    data: {
      title: 'Delete User',
      subtitle: 'Are you sure to delete this User?',
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
    private service: UsersService,
    private messageBox: MessageBoxComponent,
    ) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
    this.getUserList();
    Observable.fromEvent(this.searchReference.nativeElement, 'keyup')
    // get value
        .map((evt: any) => evt.target.value)
        // text length must be > 2 chars
        //.filter(res => res.length > 2)
        // emit after 1s of silence
        .debounceTime(500)
        // emit only if data changes since the last emit
        .distinctUntilChanged()
        // subscription
        .subscribe((text: string) => this.searchUsers(text));
  }
  getUserList(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getUserList(offset + 1).subscribe(result => {
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
  searchUsers(search) {
    this.searchBox = search;
    if (search.length > 0) {
      this.service.searchUsers(search).subscribe(
          (result) => {
            if (result.status === 200) {
              this.count = result.result.length;
              this.offset = 0;
              this.limit = result.result.length;
              this.model = result.result;
            }
          }
      );
    } else {
      this.getUserList();
    }
  }
  deleteBtn(row, rowIndex) {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let body={
          user_id:row.id
        }
        this.service.deleteUser(body).subscribe(resultData => {
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
  changeUserStatus(userId){

  }
}

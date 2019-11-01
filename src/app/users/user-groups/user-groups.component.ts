import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { DeleteDataDialogComponent } from '../../core';
import { UsersService } from 'src/app/shared/services/users-service';
import {DataSharingService} from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})

export class UserGroupsComponent implements OnInit {
  model = [];
  isLoading = false;
  term = ' ';
  dialogRefDeleteData: MatDialogRef<any> | null;
  deleteConfig = {
    disableClose: false,
    data: {
      title: 'Delete Group',
      subtitle: 'Are you sure to delete this Group?',
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
    public dataSharingService: DataSharingService
    ) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
    this.getGroupList();
  }
  getGroupList(event?) {
    // const offset = event ? event.offset : this.offset;
    this.service.getGroupList().subscribe(result => {
      this.isLoading = false;
      if (result.status === 200) {
        this.model = result.result;
      } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  deleteBtn(row, rowIndex) {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteUser(row.id).subscribe(resultData => {
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
  setSelectedGroup(group) {
    this.dataSharingService.selectedUserGroup = group;
  }
  // changeProjectStatus(model) {
  //   this.service.changeProjectStatus(model.id).subscribe((result) => {
  //     if (result.status === 200) {
  //       this.getProjectList(this.offset);
  //       this.messageBox.showSuccess(null, 'Delete Succeeded!');
  //     } else {
  //       this.messageBox.showError(null, 'Operation failed!');
  //     }
  //   });
  // }
}

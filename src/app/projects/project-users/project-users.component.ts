import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { ProjectsService } from '../../shared/services/project-service';
import { DeleteDataDialogComponent } from '../../core';
import { AddUsersModalComponent } from './add-users-modal.component';
@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  model = [];
  id: number;
  isLoading = false;
  count = 0;
  offset = 0;
  limit = 20;
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
    private router: Router,
    private service: ProjectsService,
    private messageBox: MessageBoxComponent) {
    // Assign the data to the data source for the table to render
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

  }
  ngOnInit() {
    this.getProjectUsers(this.offset);
  }
  getProjectUsers(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getProjectUsers(this.id, offset + 1).subscribe(result => {
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
  deleteBtn(row, rowIndex) {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteProjectUser(this.id, row.id).subscribe(resultData => {
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
  addEvent() {
    // const dialogRef = this.dialog.open( AddEventModalComponent, this.addEventConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.service.deleteProject(row.id).subscribe(resultData => {
    //       if (resultData.status === 200) {
    //         this.model.splice(rowIndex, 1);
    //         this.model = [...this.model];
    //         this.messageBox.showSuccess(null, 'Delete Succeeded!');
    //       } else {
    //         this.messageBox.showError(null, 'Operation failed!');
    //       }
    //     });
    //   }
    // });
  }
  backClicked() {
    this.router.navigate(['/projects/project-list']);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { ProjectsService } from '../../shared/services/project-service';
import {DataSharingService} from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-report-project-list',
  templateUrl: './report-project-list.component.html',
  styleUrls: ['./report-project-list.component.scss']
})
export class ReportProjectListComponent implements OnInit {

  model = [];
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
      subtitle: 'Are you sure to delete this Project?',
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
      private router:Router,
      public dialog: MatDialog,
      private service: ProjectsService,
      private messageBox: MessageBoxComponent,
      public dataSharingService:DataSharingService) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
    this.getProjectList(this.offset);
  }

  getProjectList(event?) {
    const offset = event ? event.offset : this.offset;
    this.service.getProjectList(offset + 1).subscribe(result => {
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
  loadProjectEvents(row){
    this.dataSharingService.projectSelected=row.id;
  }
}

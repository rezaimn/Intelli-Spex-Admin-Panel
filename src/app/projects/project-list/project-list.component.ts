import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { ProjectsService } from '../../shared/services/project-service';
import { DeleteDataDialogComponent } from '../../core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  model = [];
  @ViewChild('searchProjects') searchReference: ElementRef;
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
    public dialog: MatDialog,
    private service: ProjectsService,
    private messageBox: MessageBoxComponent) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
    this.getProjectList(this.offset);
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
        .subscribe((text: string) => this.searchProjects(text));
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
  deleteBtn(row, rowIndex) {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, this.deleteConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteProject(row.id).subscribe(resultData => {
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
  changeProjectStatus(model) {
    this.service.changeProjectStatus(model.id).subscribe((result) => {
      if (result.status === 200) {
        this.getProjectList(this.offset);
        this.messageBox.showSuccess(null, 'Change Status Succeeded!');
      } else {
        this.messageBox.showError(null, 'Operation failed!');
      }
    });
  }
  searchProjects(search) {
    this.searchBox = search;
    if (search.length > 0) {
      this.service.searchProject(search).subscribe(
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
      this.getProjectList();
    }
  }
}

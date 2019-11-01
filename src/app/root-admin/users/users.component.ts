import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { ProjectsService } from '../../shared/services/project-service';
import { DeleteDataDialogComponent } from '../../core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service: ProjectsService,
    private messageBox: MessageBoxComponent) {
    // Assign the data to the data source for the table to render
  }
  ngOnInit() {
  }

}

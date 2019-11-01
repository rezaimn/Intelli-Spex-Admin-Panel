import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { MessageBoxComponent } from '../../shared/messageBox';
import { DeleteDataDialogComponent } from '../../core';
import { UsersService } from 'src/app/shared/services/users-service';
import {DataSharingService} from '../../shared/services/data-sharing.service';

@Component({
  selector: 'app-user-group-tabs',
  templateUrl: './user-group-tabs.component.html',
  styleUrls: ['./user-group-tabs.component.scss']
})

export class UserGroupTabsComponent implements OnInit {
  selectedTabIndex=0;
  constructor(

    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
    private service: UsersService,
    public dataSharingService:DataSharingService,
    private messageBox: MessageBoxComponent) {
    // Assign the data to the data source for the table to render
    this.selectedTabIndex=this.dataSharingService.goBackToGroupTab;
    this.dataSharingService.goBackToGroupTab=0;
  }
  ngOnInit() {

  }



}

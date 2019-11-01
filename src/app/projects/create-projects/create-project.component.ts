import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../../shared/messageBox';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDataDialogComponent } from '../../core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/shared/services/project-service';
import { CreateProjectModel } from 'src/app/shared/models/create-project.model';
import {UsersService} from '../../shared/services/users-service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  model: CreateProjectModel = new CreateProjectModel();
  PAList=[];
  selectedPA=0;
  constructor(
    private service: ProjectsService,
    private userService: UsersService,
    private router: Router,
    private messageBox: MessageBoxComponent,
    public dialog: MatDialog,
  ) {
    this.getPAList();
    }
  backClicked() {
    this.router.navigate(['/projects/project-list']);
  }
  addProject() {
    this.service.addProject(this.model).subscribe((result) => {
      if (result.status === 200) {
        this.messageBox.showSuccess(null, `${result.result.name} created successfully`);
        this.router.navigate(['/projects/project-list']);
      } else {
        this.messageBox.showError(null, result);
      }
    });
  }
  getPAList() {
    this.userService.getUsersByRole(3).subscribe((result) => {
      if (result.status === 200) {
        this.PAList=result.result.data;
      }
    });
  }
  setPA(id){
    console.log(id);
    this.selectedPA=id;
  }
}
